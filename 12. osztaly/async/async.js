async function GetAllPosts() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await response.json();
      return posts;
    } catch (error) {
      console.error('Hiba történt az összes post lekérése közben:', error);
    }
  }
  
 
async function GetPostById(id) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const post = await response.json();
      return post;
    } catch (error) {
      console.error(`Hiba történt a(z) ${id} ID-jű post lekérése közben:`, error);
    }
  }
  

async function CreatePost() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: 'foo',
          body: 'bar',
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const newPost = await response.json();
      return newPost;
    } catch (error) {
      console.error('Hiba történt az új post létrehozása közben:', error);
    }
  }
  

async function UpdatePost(id) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          title: 'foo',
          body: 'bar',
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const updatedPost = await response.json();
      return updatedPost;
    } catch (error) {
      console.error(`Hiba történt a(z) ${id} ID-jű post frissítése közben:`, error);
    }
  }
  
  
async function PatchPost(id) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: 'foo',
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const patchedPost = await response.json();
      return patchedPost;
    } catch (error) {
      console.error(`Hiba történt a(z) ${id} ID-jű post részleges frissítése közben:`, error);
    }
  }
  
 
async function DeletePost(id) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log(`A(z) ${id} ID-jű post sikeresen törölve lett.`);
      } else {
        console.error(`Hiba történt a(z) ${id} ID-jű post törlése közben:`, response.status);
      }
    } catch (error) {
      console.error(`Hiba történt a(z) ${id} ID-jű post törlése közben:`, error);
    }
  }
  
  (async () => {
    console.log(await GetAllPosts());            
    console.log(await GetPostById(1));           
    console.log(await CreatePost());            
    console.log(await UpdatePost(1));            
    console.log(await PatchPost(1));             
    console.log(await DeletePost(1));            
  })();
  