var allpostElems = [];

function showCreatepostModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createpostModal = document.getElementById('create-post-modal');

  // Show the modal and its backdrop.
  modalBackdrop.classList.remove('hidden');
  createpostModal.classList.remove('hidden');

}

/*
 * This function hides the modal to create a post and clears any existing
 * values from the input fields whenever any of the modal close actions are
 * taken.
 */
function closeCreatepostModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createpostModal = document.getElementById('create-post-modal');

  // Hide the modal and its backdrop.
  modalBackdrop.classList.add('hidden');
  createpostModal.classList.add('hidden');

  clearpostInputValues();

}

/*
 * This function clears any value present in any of the post input elements.
 */
function clearpostInputValues() {

  var postInputElems = document.getElementsByClassName('post-input-element');
  for (var i = 0; i < postInputElems.length; i++) {
    var input = postInputElems[i].querySelector('input, textarea');
    input.value = '';
  }

}

/*
 * Create and return a new HTML element representing a single post, given the
 * post text and post attribution as arguments.  The post element has the
 * following structure:
 *
 * <article class="post">
 *   <div class="post-icon">
 *     <i class="fa fa-bullhorn"></i>
 *   </div>
 *   <div class="post-content">
 *     <p class="post-text">
 *       {{postText}}
 *     </p>
 *     <p class="post-attribution">
 *       <a href="#">{{postAttribution}}</a>
 *     </p>
 *   </div>
 * </article>
 */
function generateNewpostElem(postText, postAuthor) {

  var postTemplate = Handlebars.templates.post;
  var postData = {
    text: postText,
    author: postAuthor
  };

  return postTemplate(postData);

}

/*
 * This function takes user input values from the "create post" modal,
 * generates a new post using them, and inserts that post into the document.
 */
function insertNewpost() {

  var postText = document.getElementById('post-text-input').value;
  var postAttribution = document.getElementById('post-attribution-input').value;

  /*
   * Only generate the new post if the user supplied values for both the post
   * text and the post attribution.  Give them an alert if they didn't.
   */
  if (postText && postAttribution) {

      var newpostElem = generateNewpostElem(postText, postAttribution);
      var postContainer = document.querySelector('.post-container');
      postContainer.insertAdjacentHTML('beforeend', newpostElem);
      allpostElems.push(newpostElem);

      closeCreatepostModal();

  } else {

    alert('You must specify both the text and the author of the post!');

  }
}

/*
 * Perform a search over over all the posts based on the search query the user
 * entered in the navbar.  Only display posts that match the search query.
 * Display all posts if the search query is empty.
 */
function dopostSearch() {

  // Grab the search query, make sure it's not null, and do some preproessing.
  var searchQuery = document.getElementById('navbar-search-input').value;
  searchQuery = searchQuery ? searchQuery.trim().toLowerCase() : '';

  // Remove all posts from the post container temporarily.
  var postContainer = document.querySelector('.post-container');
  while (postContainer.lastChild) {
    postContainer.removeChild(postContainer.lastChild);
  }

  /*
   * Loop through the collection of all posts and add posts back into the DOM
   * if they contain the search term or if the search term is empty.
   */
  allpostElems.forEach(function (postElem) {
    if (!searchQuery || postElem.textContent.toLowerCase().indexOf(searchQuery) !== -1) {
      postContainer.appendChild(postElem);
    }
  });

}


/*
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener('DOMContentLoaded', function () {

  // Remember all of the existing posts in an array that we can use for search.
  var postElemsCollection = document.getElementsByClassName('post');
  for (var i = 0; i < postElemsCollection.length; i++) {
    allpostElems.push(postElemsCollection[i]);
  }

  var createpostButton = document.getElementById('create-post-button');
  createpostButton.addEventListener('click', showCreatepostModal);

  var modalCloseButton = document.querySelector('#create-post-modal .modal-close-button');
  modalCloseButton.addEventListener('click', closeCreatepostModal);

  var modalCancalButton = document.querySelector('#create-post-modal .modal-cancel-button');
  modalCancalButton.addEventListener('click', closeCreatepostModal);

  var modalAcceptButton = document.querySelector('#create-post-modal .modal-accept-button');
  modalAcceptButton.addEventListener('click', insertNewpost);

  var searchButton = document.getElementById('navbar-search-button');
  searchButton.addEventListener('click', dopostSearch);

  var searchInput = document.getElementById('navbar-search-input');
  searchInput.addEventListener('input', dopostSearch);

});
