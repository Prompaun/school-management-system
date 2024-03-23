<div className="list-group">
  <h2 className="list-group-item list-group-item-action active">เข้าสู่ระบบ</h2>
  <form onSubmit={handleSubmit}>
    <div className="list-group-item d-flex">
      <label htmlFor="username" className="form-label me-3">Username: </label>
      <input
        type="text"
        className="form-control w-50"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="list-group-item d-flex">
      <label htmlFor="password" className="form-label me-3">Password: </label>
      <input
        type="password"
        className="form-control w-50"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="list-group-item">
      <button type="submit" className="btn btn-primary float-end">Log-in</button>
    </div>
  </form>
</div>
