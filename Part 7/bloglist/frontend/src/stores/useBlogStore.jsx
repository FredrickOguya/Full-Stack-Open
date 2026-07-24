import { create } from 'zustand'
const useBlogStore = create(set => ({
  blogs: [],
  setBlogs: (blogs) => {
    set({ blogs })
  },
  addBlog: (blog) => {
    set((state) => ({
      blogs: state.blogs.concat(blog)
    }))
  },
  updateBlog: (updatedBlog) => {
    set((state) => ({
      blogs:  state.blogs.map(b =>
        b.id === updatedBlog.id ? updatedBlog : b)
    }))
  },
  removeBlog: (id) => {
    set((state) => ({
      blogs: state.blogs.filter(b => b.id !== id)
    }))
  }
}))

export default useBlogStore