var allpostElems = [];
var postData = [];

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    postData = JSON.parse(this.response);
  }
};
xhttp.open("GET", "postData.json", false);
xhttp.send();

console.log(postData[0])


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

  if (postText && postAttribution) {

    storePost(postText, postAttribution, function(err){

      if (err) {
        alert("Unable to save post.  Got this error:\n\n" + err);
      } else {



        var newpostElem = generateNewpostElem(postText, postAttribution, postPoints);
        var postcontent = document.querySelector('.post-content');
        postcontent.insertAdjacentHTML('beforeend', newpostElem);

        allpostElems.push(newpostElem);

        closeCreatepostModal();

      }

    });
  }
  else {
    alert('Both text and author text must be present!!')
  }
}
function storePost(text, author, callback){

  console.log(text);
  console.log(author);

  var postRequest = new XMLHttpRequest();
  postRequest.open('POST', '/posts/');
  postRequest.setRequestHeader('Content-Type', 'application/json');

  postRequest.addEventListener('load', function (event) {
    var error;
    if (event.target.status !== 200) {
      error = event.target.response;
    }
    callback(error);
  });

  var personBody = {
    points: '0',
    text: text,
    author: author
  };

  console.log(personBody);

  postRequest.send(JSON.stringify(personBody));
};


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
