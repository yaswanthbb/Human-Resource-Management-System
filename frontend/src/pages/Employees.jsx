import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import Header from "./Header";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line, RiSaveLine } from "react-icons/ri";
import { toast } from "react-toastify";

function Employees() {
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "" });
  const [openModal, setOpenModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "",
  });

  const fetchEmployees = useCallback(async () => {
    const res = await api.get("/employees");
    setList(res.data);
  }, []);

  const deleteEmployee = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      toast.success("Employee removed");
      fetchEmployees();
    } catch (err) {
      toast.error(err.response?.data?.error || "Delete failed");
    }
  };

  const startEdit = (emp) => {
    setEditId(emp.id);
    setEditForm({ name: emp.name, email: emp.email, role: emp.role });
  };

  const updateEmployee = async () => {
    try {
      await api.put(`/employees/${editId}`, editForm);

      toast.success("Employee updated successfully!");

      setEditId(null);
      fetchEmployees();
    } catch (err) {
      toast.error(err.response?.data?.error || "Update failed");
    }
  };

  const saveEmployee = async () => {
    try {
      if (!newEmployee.name || !newEmployee.email || !newEmployee.role) {
        toast.error("All fields are required");
        return;
      }

      await api.post("/employees", newEmployee);

      toast.success("Employee created successfully!");

      setNewEmployee({ name: "", email: "", role: "" });
      setOpenModal(false);
      fetchEmployees();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create employee");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <div className="container">
      <Header />
      <button className="fab-btn" onClick={() => setOpenModal(true)}>
        +
      </button>

      <div className="employees-container">
        <div className="table-header">
          <h2>Employees</h2>
          <button className="add-btn" onClick={() => setOpenModal(true)}>
            Add Employee
          </button>
        </div>
        <div className="employee-table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Teams</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No employees found
                  </td>
                </tr>
              ) : (
                list.map((e) => (
                  <tr key={e.id}>
                    {editId === e.id ? (
                      <>
                        <td>{e.id}</td>

                        <td>
                          <input
                            value={editForm.name}
                            onChange={(ev) =>
                              setEditForm({
                                ...editForm,
                                name: ev.target.value,
                              })
                            }
                          />
                        </td>

                        <td>
                          <input
                            value={editForm.email}
                            onChange={(ev) =>
                              setEditForm({
                                ...editForm,
                                email: ev.target.value,
                              })
                            }
                          />
                        </td>

                        <td>
                          <input
                            value={editForm.role}
                            onChange={(ev) =>
                              setEditForm({
                                ...editForm,
                                role: ev.target.value,
                              })
                            }
                          />
                        </td>

                        <td>
                          {/* Teams chips */}
                          {e.Teams && e.Teams.length > 0 ? (
                            <div className="team-chip-container">
                              {e.Teams.map((t) => (
                                <span key={t.id} className="team-chip">
                                  {t.name}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span>No Teams</span>
                          )}
                        </td>

                        <td>
                          <button onClick={updateEmployee}>
                            <RiSaveLine className="save-icon" />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td className="email-input">{e.email}</td>
                        <td>{e.role}</td>

                        {/* TEAM CHIPS */}
                        <td>
                          {e.Teams && e.Teams.length > 0 ? (
                            <div className="team-chip-container">
                              {e.Teams.map((t) => (
                                <span key={t.id} className="team-chip">
                                  {t.name}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span>No Teams</span>
                          )}
                        </td>

                        <td>
                          <button onClick={() => startEdit(e)}>
                            <FiEdit className="edit-icon" />
                          </button>

                          <button onClick={() => deleteEmployee(e.id)}>
                            <RiDeleteBin6Line className="delete-icon" />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Create Employee</h3>

            <input
              placeholder="Name"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
            />

            <input
              placeholder="Email"
              value={newEmployee.email}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, email: e.target.value })
              }
            />

            <input
              placeholder="Role"
              value={newEmployee.role}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, role: e.target.value })
              }
            />

            <div className="modal-actions">
              <button onClick={() => setOpenModal(false)}>Cancel</button>
              <button onClick={saveEmployee}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employees;
