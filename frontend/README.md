<!-- <div className="employee-list">
          {list.length === 0 ? (
            <p>No employees found</p>
          ) : (
            list.map((e) => (
              <div key={e.id} className="employee-card">
                {editId === e.id ? (
                  <>
                    <input
                      value={editForm.name}
                      onChange={(ev) =>
                        setEditForm({ ...editForm, name: ev.target.value })
                      }
                    />
                    <input
                      value={editForm.email}
                      onChange={(ev) =>
                        setEditForm({ ...editForm, email: ev.target.value })
                      }
                    />
                    <input
                      value={editForm.role}
                      onChange={(ev) =>
                        setEditForm({ ...editForm, role: ev.target.value })
                      }
                    />

                    <button onClick={updateEmployee}>Save</button>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>ID:</strong> {e.id}
                    </p>
                    <p>
                      <strong>Name:</strong> {e.name}
                    </p>
                    <p>
                      <strong>Role:</strong> {e.role}
                    </p>

                    <div className="btn-row">
                      <button onClick={() => startEdit(e)}>Edit</button>
                      <button onClick={() => deleteEmployee(e.id)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div> -->