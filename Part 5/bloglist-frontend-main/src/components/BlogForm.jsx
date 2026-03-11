  const BlogForm = ({ onSubmit, handleAuthorChange, handleTitleChange, handleUrlChange, title, author, url }) => {
      return (<form onSubmit={onSubmit}>
      <div>
        <label>
          Title:
          <input value={title} onChange={handleTitleChange}/>
        </label>
      </div>
      <div>
        <label>
          Author:
          <input value={author} onChange={handleAuthorChange}/>
        </label>
      </div>      
      <div>
        <label>
          url:
          <input value={url} onChange={handleUrlChange}/>
        </label>
      </div>
      <button type='submit'>save</button>
    </form> 
   )   
  }

export default BlogForm