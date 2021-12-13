const { response } = require("express");
const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const axios = require("axios");
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require("normalize-url");
const checkObjectId = require("../../middleware/checkObjectId");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

// @router  GET api/profile/me
// @desc    get current user profile
// @access  private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  auth,
  check("gender", "Gender is required").notEmpty(),
  check("classYear", "Class is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      gender,
      major,
      classYear,
      bio,
      smokerBool,
      sleepRoutine,
      socialSpectrum,
      tidiness,
      noiseTolerance,
      hobbies,
      wearHeadphonesBool,
      spiritAnimal,
      additionalPreferences,
      searchingRoommate,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    // build a profile
    const profileFields = {
      user: req.user.id,

      ...rest,
    };

    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.major) profileFields.major = req.body.major;
    if (req.body.classYear) profileFields.classYear = req.body.classYear;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.smokerBool) profileFields.smokerBool = req.body.smokerBool;
    if (req.body.sleepRoutine)
      profileFields.sleepRoutine = req.body.sleepRoutine;
    if (req.body.socialSpectrum)
      profileFields.socialSpectrum = req.body.socialSpectrum;
    if (req.body.tidiness) profileFields.tidiness = req.body.tidiness;
    if (req.body.noiseTolerance)
      profileFields.noiseTolerance = req.body.noiseTolerance;
    if (req.body.hobbies) profileFields.hobbies = req.body.hobbies;
    if (req.body.wearHeadphonesBool)
      profileFields.wearHeadphonesBool = req.body.wearHeadphonesBool;
    if (req.body.spiritAnimal)
      profileFields.spiritAnimals = req.body.spiritAnimal;
    if (req.body.additionalPreferences)
      profileFields.additionalPreferences = req.body.additionalPreferences;
    if (req.body.searchingRoommate)
      profileFields.searchingRoommate = req.body.searchingRoommate;

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0) socialFields[key] = value;
    }
    // add to profileFields
    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  "/user/:user_id",
  checkObjectId("user_id"),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id,
      }).populate("user", ["name", "avatar"]);

      if (!profile) return res.status(400).json({ msg: "Profile not found" });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route    GET api/profile/match
// @desc     Get profile randomly
// @access   Public
router.get("/match", async (req, res) => {
  try {
    let profileVariable = await Profile.aggregate([{ $sample: { size: 1 } }]);

    res.json(profileVariable);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove user posts
    // Remove profile
    // Remove user
    await Promise.all([
      Post.deleteMany({ user: req.user.id }),
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id }),
    ]);

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// GET FOLLOWERS OF USER
router.get("/followers/:user_id", auth, async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await FollowerModel.findOne({ user: user_id }).populate(
      "followers.user"
    );

    return res.json(user.followers);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// GET FOLLOWING OF USER
router.get("/following/:user_id", auth, async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await FollowerModel.findOne({ user: user_id }).populate(
      "following.user"
    );

    return res.json(user.following);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// FOLLOW A USER
router.post("/follow/:userToFollowId", auth, async (req, res) => {
  try {
    const { user_id } = req;
    const { userToFollowId } = req.params;

    const user = await FollowerModel.findOne({ user: user_id });
    const userToFollow = await FollowerModel.findOne({ user: userToFollowId });

    if (!user || !userToFollow) {
      return res.status(404).send("User not found");
    }

    const isFollowing =
      user.following.length > 0 &&
      user.following.filter(
        (following) => following.user.toString() === userToFollowId
      ).length > 0;

    if (isFollowing) {
      return res.status(401).send("User Already Followed");
    }

    await user.following.unshift({ user: userToFollowId });
    await user.save();

    await userToFollow.followers.unshift({ user: userId });
    await userToFollow.save();

    await newFollowerNotification(userId, userToFollowId);

    return res.status(200).send("Updated");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// UNFOLLOW A USER
router.put("/unfollow/:userToUnfollowId", auth, async (req, res) => {
  try {
    const { user_id } = req;
    const { userToUnfollowId } = req.params;

    const user = await FollowerModel.findOne({
      user: user_id,
    });

    const userToUnfollow = await FollowerModel.findOne({
      user: userToUnfollowId,
    });

    if (!user || !userToUnfollow) {
      return res.status(404).send("User not found");
    }

    const isFollowing =
      user.following.length > 0 &&
      user.following.filter(
        (following) => following.user.toString() === userToUnfollowId
      ).length === 0;

    if (isFollowing) {
      return res.status(401).send("User Not Followed before");
    }

    const removeFollowing = await user.following
      .map((following) => following.user.toString())
      .indexOf(userToUnfollowId);

    await user.following.splice(removeFollowing, 1);
    await user.save();

    const removeFollower = await userToUnfollow.followers
      .map((follower) => follower.user.toString())
      .indexOf(userId);

    await userToUnfollow.followers.splice(removeFollower, 1);
    await userToUnfollow.save();

    await removeFollowerNotification(userId, userToUnfollowId);

    return res.status(200).send("Updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

module.exports = router;
