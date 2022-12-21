// mathod to submit form data using AJAX
const createPost = () => {
   //jquey element selector
   $(document).ready(function () {
      let newPostForm = $("#create_post_form");
      newPostForm.submit(function (e) {
         e.preventDefault();
         $.ajax({
            url: "/posts/create",
            type: "POST",
            data: newPostForm.serialize(),
            success: function (data) {
               console.log(data);
               const domPost = getPostForDom(data.post);
               $("#display_posts").prepend(domPost);
            },
            error: function (error) {
               console.log(`Error ${error}`);
            },
         });
      });
   });
};
createPost();

// mathod to submit form data using AJAX
const getPostForDom = (post) => {
   return `
   <ul>
    <li>
       ${post.content}
       <large>
          <a class="post_delete_icon" href="/posts/destroy/${post._id}">X</a>
       </large>
    </li>
    <li>${post.user.name}</li>
    <li>${post.createdAt}</li>
    <div class="comments_container">
       <form action="comments/create" method="post">
          <input
             type="text"
             name="content"
             placeholder="Type a comment... "
             required
          />
          <input type="hidden" name="post" value="${post._id}" />
          <input type="submit" value="comment" />
       </form>
    </div>
 </ul>`;
};

//this will delete post asynchronously
const deletePost = (postElement) => {
   postElement.preventDefault();
   $.ajax({
      type: "GET",
      url: postElement.currentTarget.href,
      success: function (data) {
         $(`#${data.postId}`).remove();
      },
      error: function (error) {
         console.log(`Error ${error}`);
      },
   });
};

//onClick of "X" of post we will now make an AJAX call
const crossButtons = document.getElementsByClassName("post_delete_icon");
for (const button of crossButtons) {
   button.addEventListener("click", deletePost);
}

// start comment creation using AJAX
const createComment = (submitEvent) => {
   submitEvent.preventDefault();
   const url = $("#comments_form").attr("action");
   const postID = $("#comments_form").find("input[name='post']").val();
   $.ajax({
      type: "POST",
      url,
      //serialize will send all the form data as it is.
      data: $("#comments_form").serialize(),
      success: function (data) {
         const new_comment = getCommentForDom(data.comment);
         $(`#comment_${postID}`).prepend(new_comment);
      },
      error: function (error) {
         console.log(`Error ${error}`);
      },
   });
};

const getCommentForDom = (comment) => {
   console.log("In getCommentForDom function", comment);
   return `
      <li>
     ${comment.content}
      <large>
         <a href="/comments/destroy/${comment.id}">X</a>
      </large>
      </li>
      <li><small>${comment.user.name}</small></li>
   `;
};

$("#comments_form").submit(createComment);

// end comment creation using AJAX

// start comment deletion
const deleteComment = (commentDeleteIcon) => {
   commentDeleteIcon.preventDefault();
   $.ajax({
      type: "GET",
      url: commentDeleteIcon.currentTarget.href,
      success: function (data) {
         $(`#comment_${data.commentId}`).remove();
      },
      error: function (error) {
         console.log(`Error ${error}`);
      },
   });
};

//onClick of "X" of post we will now make an AJAX call
const comment_cross_icons = document.getElementsByClassName(
   "comment_delete_icon"
);
for (const crossIcon of comment_cross_icons) {
   crossIcon.addEventListener("click", deleteComment);
}
// end comment deletion
