import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";
import CommentItem from "../post/CommentItem";
import { getPost } from "../../actions/post";
import SideBar from "../layout/SideBar";
import { Col,Container,Row } from "reactstrap";

const Post = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Container style={{ maxWidth: "100%" }}>
      <Row>
        <Col xs={3}>
          <SideBar />
        </Col>
        <Col xs={9}>
          <section className="container">
            <Link to="/posts" className="btn">
              Back To Posts
            </Link>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div className="comments">
              {post.comments.map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  postId={post._id}
                />
              ))}
            </div>
          </section>
        </Col>
      </Row>
    </Container>
    // <div>
    //   <SideBar />
    //   <section className="container">
    //     <Link to="/posts" className="btn">
    //       Back To Posts
    //     </Link>
    //     <PostItem post={post} showActions={false} />
    //     <CommentForm postId={post._id} />
    //     <div className="comments">
    //       {post.comments.map((comment) => (
    //         <CommentItem
    //           key={comment._id}
    //           comment={comment}
    //           postId={post._id}
    //         />
    //       ))}
    //     </div>
    //   </section>
    // </div>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
