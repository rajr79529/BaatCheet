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
               let domPost = renderPostToDom(data.post);
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
const renderPostToDom = (post) => {
   return `
   <ul>
    <li>
       ${post.content}
       <large>
          <a href="/posts/destroy/${post._id}">X</a>
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
