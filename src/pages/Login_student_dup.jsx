<div className="card w-40 mx-auto mt-5" style={{ boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)' }}>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <img src={school_logo} alt="Register Image" width="100" height="100" />
                        <h2 className="ms-3 mb-0">โรงเรียนฤทธิยะวรรณาลัย (ประถม)</h2>
                    </div>
                        <br></br>

                        <div className="mb-3 d-flex" style={{gap: '15px'}}>
                            <label>
                                <span style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>รหัสประจำตัวนักเรียน:</span>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            
                        </div>

                        <div className="mb-3 d-flex">
                            <label>
                                <span htmlFor="password" className="form-label me-3"style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>รหัสประจำตัวประชาชน:</span>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                            <Link to="/">
                                <button type="submit" className="btn btn-primary float-end">Log in</button>
                            </Link>
                </div>
            </div>