import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import Header from "./Header";
import { RiDeleteBin6Line, RiSaveLine } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { toast } from "react-toastify";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [assignId, setAssignId] = useState("");

  const fetchTeams = useCallback(async () => {
    const res = await api.get("/teams");
    setTeams(res.data);
  }, []);
  const createTeam = async () => {
    try {
      if (!newTeamName.trim()) {
        toast.error("Team name is required");
        return;
      }

      await api.post("/teams", { name: newTeamName });

      toast.success("Team created successfully!");
      setOpenModal(false);
      setNewTeamName("");
      fetchTeams();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create team");
    }
  };

  const deleteTeam = async (id) => {
    try {
      await api.delete(`/teams/${id}`);
      toast.success("Team deleted");
      fetchTeams();
    } catch (err) {
      toast.error(err.response?.data?.error || "Unable to delete team");
    }
  };

  const assignNow = async (teamId) => {
    try {
      if (!assignId) {
        toast.error("Please enter employee ID");
        return;
      }

      await api.post("/team-assign/assign", {
        employeeId: assignId,
        teamId,
      });

      toast.success("Employee added to team!");
      setAssignId("");
      fetchTeams();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to assign");
    }
  };

  const removeMember = async (teamId, empId) => {
    try {
      await api.post("/team-assign/remove", {
        employeeId: empId,
        teamId,
      });

      toast.success("Member removed");
      fetchTeams();
    } catch (err) {
      toast.error(err.response?.data?.error || "Unable to remove member");
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return (
    <div className="container">
      <Header />

      <div className="employees-container">
        <div className="table-header">
          <h2>Teams</h2>

          <button className="add-btn" onClick={() => setOpenModal(true)}>
            Add Team
          </button>
        </div>

        <div className="employee-table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Team ID</th>
                <th>Team Name</th>
                <th>Employees</th>
                <th>Expand</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No teams found
                  </td>
                </tr>
              ) : (
                teams.map((t) => (
                  <>
                    <tr key={t.id}>
                      <td>{t.id}</td>
                      <td>{t.name}</td>
                      <td>{t.Employees?.length || 0} Employees</td>

                      <td>
                        <button
                          className="icon-btn"
                          onClick={() =>
                            setExpanded(expanded === t.id ? null : t.id)
                          }
                        >
                          {expanded === t.id ? (
                            <IoIosArrowUp size={22} />
                          ) : (
                            <IoIosArrowDown size={22} />
                          )}
                        </button>
                      </td>

                      <td>
                        <button onClick={() => deleteTeam(t.id)}>
                          <RiDeleteBin6Line className="delete-icon" />
                        </button>
                      </td>
                    </tr>
                    {expanded === t.id && (
                      <tr className="expanded-row">
                        <td colSpan="5">
                          <h4>Members</h4>

                          {t.Employees && t.Employees.length > 0 ? (
                            <table className="employee-table">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Name</th>
                                  <th>Role</th>
                                  <th>Remove</th>
                                </tr>
                              </thead>

                              <tbody>
                                {t.Employees.map((e) => (
                                  <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.role}</td>
                                    <td>
                                      <button
                                        onClick={() => removeMember(t.id, e.id)}
                                      >
                                        <RiDeleteBin6Line className="delete-icon" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p>No employees assigned</p>
                          )}
                          <div className="add-member-row">
                            <input
                              placeholder="Employee ID"
                              value={assignId}
                              onChange={(e) => setAssignId(e.target.value)}
                            />

                            <button
                              className="add-member-btn"
                              onClick={() => assignNow(t.id)}
                            >
                              Add Member
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Create Team</h3>

            <input
              placeholder="Team Name"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={() => setOpenModal(false)}>Cancel</button>
              <button onClick={createTeam}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Teams;
