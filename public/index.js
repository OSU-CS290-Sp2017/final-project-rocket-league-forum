var allpostElems = [];


function showCreatepostModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createpostModal = document.getElementById('create-post-modal');

  modalBackdrop.classList.remove('hidden');
  createpostModal.classList.remove('hidden');

}

function closeCreatepostModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createpostModal = document.getElementById('create-post-modal');

  modalBackdrop.classList.add('hidden');
  createpostModal.classList.add('hidden');

  clearpostInputValues();

}

function clearpostInputValues() {

  var postInputElems = document.getElementsByClassName('post-input-element');
  for (var i = 0; i < postInputElems.length; i++) {
    var input = postInputElems[i].querySelector('input, textarea');
    input.value = '';
  }

}

function generateNewpostElem(postText, postAuthor, postPoints) {
  var postTemplate = Handlebars.templates.post; //error
  alert("here1");
  var postData = {
    text: postText,
    author: postAuthor,
    points: postPoints
  };

  return postTemplate(postData);
}

function insertNewpost() {

  var postText = document.getElementById('post-text-input').value;
  var postAttribution = document.getElementById('post-attribution-input').value;
  var postPoints = "0";
 
  if (postText && postAttribution) {

      var newpostElem = generateNewpostElem(postText, postAttribution, postPoints);
      var postcontent = document.querySelector('.post-content');
      postcontent.insertAdjacentHTML('beforeend', newpostElem);

      allpostElems.push(newpostElem);

      closeCreatepostModal();

  } else {

    alert('You must specify both the text and the author of the post!');

  }
}


function dopostSearch() {

  var searchQuery = document.getElementById('navbar-search-input').value;
  searchQuery = searchQuery ? searchQuery.trim().toLowerCase() : '';

  var postcontent = document.querySelector('.post-content');
  while (postcontent.lastChild) {
    postcontent.removeChild(postcontent.lastChild);
  }

  allpostElems.forEach(function (postElem) {
    if (!searchQuery || postElem.textContent.toLowerCase().indexOf(searchQuery) !== -1) {
      postcontent.appendChild(postElem);
    }
  });

}

/*function changePointsup() {
  var choice = 1;
  var current_num;

  var new_num = (current_num + choice);
  document.getElementsByClassName("points").innerHTML = new_num;

}
function changePointsdown() {
  var choice = -1;
  var current_num = parseInt(document.getElementsByClassName("points"));
  var new_num = (current_num + choice);
  document.getElementsByClassName("points").innerHTML = new_num;

}*/


window.addEventListener('DOMContentLoaded', function () {

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

  var searchInput = document.getElementById('navbar-search-input');
  searchInput.addEventListener('input', dopostSearch);

  /*var upvote = document.getElementsByClassName('upvote');
  for (var i=0; i<upvote.length; i++){
    upvote[i].addEventListener('click',changePointsup);
  }

  var downvote = document.getElementsByClassName('downvote');
  for (var i=0; i<downvote.length; i++){
    downvote[i].addEventListener('click',changePointsdown);
  }*/
});
