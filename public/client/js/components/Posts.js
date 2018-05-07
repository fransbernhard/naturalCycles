import React, {Component} from 'react';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';

class Posts extends Component {
	render(){
	  return (
      <ul className="post-ul">
				{this.props.posts.map((post, i) =>
					<li key={i}>
						<p>{post.title}</p>
					</li>
				)}
      </ul>
    )
  }
}

const mapStateToProps = posts => {
  return posts
}

export default connect(mapStateToProps)(Posts);
