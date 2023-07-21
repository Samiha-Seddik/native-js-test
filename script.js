const baseURL = 'https://jsonplaceholder.typicode.com'
//get list posts(articles)
    function getListArticles() {
        $.ajax({
            url: `${baseURL}/posts`,
            method: "GET",
            success: function(data) {
                
                displayPostsData(data)
            },
            error: function(error) {
                console.error("Une erreur s'est produite lors du chargement des articles : ", error);
            }
        });
    }
    //display posts data in the table
    function displayPostsData(data){
        const tableBody = document.querySelector('#list_article tbody');
        data.forEach(row => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td onclick="getUserInformation(${row.userId})">${row.userId}</td>
                <td onclick="handleTitleClick(${row.id})">${row.title}</td>
            `;
            tableBody.appendChild(newRow);
        });
    }
     // handle click event on userId to get user selected informations
    function getUserInformation(userId) {
        $.ajax({
            url: `${baseURL}/users/${userId}`,
            method: "GET",
            success: function(dataUser) {
                displayUserData(dataUser)
                document.getElementById('user-info').style.display = 'block'
            },
            error: function(error) {
                console.error("Une erreur s'est produite lors du chargement des iformations de l'hauteur choisi : ", error);
            }
        });
    }
    //display user data in the table
    function displayUserData(userInfo){
        const userDetails = $("#user-info-data tbody");
        userDetails.empty()
        const tableBody = document.querySelector('#user-info-data tbody');
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td >${userInfo.id}</td>
                <td>${userInfo.name}</td>
                <td>${userInfo.email}</td>
                <td><a href='http://${userInfo.website}' target="_blank"> ${userInfo.website}</a></td>
            `;
            tableBody.appendChild(newRow);
    }
    // handle title click
    function handleTitleClick(idPost) {
        $.ajax({
            url: `${baseURL}/posts/${idPost}`,
            method: "GET",
            success: function(dataPoste) {
                getCommentByIdPost(dataPoste.id)
                displaySelectedPostData(dataPoste)
                document.getElementById('post-info').style.display = 'block'
            },
            error: function(error) {
                console.error("Une erreur s'est produite lors du chargement des iformations du poste choisi : ", error);
            }
        });
    }
    //display data of the selected post
    function displaySelectedPostData(postInfo){
        const articleDetails = $("#post-info-table tbody");
        articleDetails.empty()
        const tableBody = document.querySelector('#post-info-table tbody');
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td >${postInfo.id}</td>
                <td>${postInfo.body}</td>
            `;
            tableBody.appendChild(newRow);
    }
    //get comments of selected post
    function getCommentByIdPost(idPost){
        const commentDetail = $("#post-comments");
        commentDetail.empty();
        $.ajax({
            url: `${baseURL}/posts/${idPost}/comments`,
            method: "GET",
            success: function(comments) {
                const root = document.createElement("ul");
document.querySelector(".details").appendChild(root);
                comments.forEach(function(comment) {
                    const title = document.createElement("li");
  title.innerText = comment.body;
  root.appendChild(title);
                });
            },
            error: function(error) {
                console.error("Une erreur s'est produite lors du chargement des commentaires du poste choisi : ", error);
            }
        });
    }
document.addEventListener('DOMContentLoaded',()=>{getListArticles()})