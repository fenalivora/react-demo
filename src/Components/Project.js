import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Badge, Modal, Form } from "react-bootstrap";
import ReactChipInput from "react-chip-input";

const Styles = styled.div`
    .project-card {
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
        padding-top: 10px;
        padding-left: 20px;
    }

    .edit-icon {
        margin-top: 10px;
        margin-right: 20px;
    }

    .tech-data {
        padding-bottom: 20px;
    }

    .trash-icon {
        margin-top: 10px;
        margin-right: 20px;
        color: red;
    }

    .icons {
        float: right;
    }
`;

const AddProjectModal = (props) => {
    const [formData, setFormData] = useState({});

    const [chips, setChips] = useState([]);

    const { id, title, description, link } = formData;

    let modalHeader;
    let isupdateProject;
    if (props.projectToUpdate) {
        modalHeader = "Update your project";
        isupdateProject = true;
    } else {
        modalHeader = "Add a project";
        isupdateProject = false;
    }

    useEffect(() => {
        if (isupdateProject) {
            setFormData({
                id: props.projectToUpdate._id,
                title: props.projectToUpdate.title,
                description: props.projectToUpdate.description,
                link: props.projectToUpdate.link,
            });
            const oldChips = props.projectToUpdate.tech;
            setChips(oldChips.split(","));
        }
    }, [isupdateProject, props]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const removeChip = (index) => {
        const removalChips = chips.slice();
        removalChips.splice(index, 1);
        setChips(removalChips);
    };

    const addChip = (value) => {
        const newChips = chips.slice();
        newChips.push(value);
        setChips(newChips);
    };

    const clearModal = () => {
        if (!isupdateProject) {
            setFormData({});
            setChips([]);
        }
        props.hideModal();
    };

    const addProject = async () => {
        let config = {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        };
        let tech = chips.join();
        let data = {
            title,
            description,
            tech,
            link,
        };
        try {
            await axios.post(
                "https://coderstoryapi.herokuapp.com/api/projects",
                data,
                config
            );
            props.addProject();
        } catch (error) {
            console.log(error);
        }
    };

    const updateProject = async () => {
        let config = {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        };
        let tech = chips.join();
        let data = {
            id,
            title,
            description,
            tech,
            link,
        };
        try {
            await axios.put(
                "https://coderstoryapi.herokuapp.com/api/projects",
                data,
                config
            );
            props.updateProject();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Styles>
            <Modal {...props} size="lg">
                <Modal.Header className="display-4">{modalHeader}</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            className="my-3"
                            placeholder="Enter Project Title"
                            name="title"
                            onChange={onChange}
                            value={title}
                        ></Form.Control>
                        <Form.Control
                            as="textarea"
                            className="my-3"
                            rows="7"
                            name="description"
                            onChange={onChange}
                            value={description}
                            placeholder="Enter Project Description"
                        ></Form.Control>
                        <ReactChipInput
                            chips={chips}
                            onRemove={(index) => removeChip(index)}
                            onSubmit={(value) => addChip(value)}
                        />
                        <Form.Control
                            type="url"
                            className="my-3"
                            name="link"
                            onChange={onChange}
                            value={link}
                            placeholder="Enter Link for Project"
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="outline-primary"
                        hidden={isupdateProject}
                        onClick={addProject}
                    >
                        Add Project
                    </Button>

                    <Button
                        variant="outline-primary"
                        hidden={!isupdateProject}
                        onClick={updateProject}
                    >
                        Update Project
                    </Button>
                    <Button variant="outline-danger" onClick={clearModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Styles>
    );
};

const DeleteModal = (props) => {
    const deleteProject = async (id) => {
        try {
            await axios.delete(
                "https://coderstoryapi.herokuapp.com/api/projects",
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                    data: {
                        id,
                    },
                }
            );
            props.deleteProject();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Styles>
            <Modal {...props} size="lg">
                <Modal.Header className="display-4">
                    Delete "{props.singleProject.title}"?
                </Modal.Header>
                <Modal.Footer>
                    <Button
                        variant="outline-danger"
                        onClick={() => deleteProject(props.singleProject._id)}
                    >
                        Delete Project
                    </Button>
                    <Button variant="outline-primary" onClick={props.hideModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Styles>
    );
};

const ProjectCard = (props) => {
    const [showUpdateProjectModal, setUpdateProjectModalVisibility] = useState(
        false
    );

    const [showDeleteModal, setDeleteModalVisibitlity] = useState(false);

    const deleteProject = () => {
        setDeleteModalVisibitlity(false);
        props.deleteProject();
    };

    return (
        <div className="project-card my-5">
            <AddProjectModal
                show={showUpdateProjectModal}
                projectToUpdate={props.singleProject}
                updateProject={props.updateProject}
                hideModal={() => setUpdateProjectModalVisibility(false)}
            />
            <DeleteModal
                show={showDeleteModal}
                singleProject={props.singleProject}
                hideModal={() => setDeleteModalVisibitlity(false)}
                deleteProject={deleteProject}
            />
            <div className="icons">
                <div
                    className="fa fa-2x fa-edit edit-icon"
                    onClick={() => setUpdateProjectModalVisibility(true)}
                />
                <div
                    className="fa fa-2x fa-trash trash-icon"
                    onClick={() => setDeleteModalVisibitlity(true)}
                />
            </div>
            <div>
                <span className="display-4">{props.singleProject.title}</span>
                <span className="h5">
                    <br />[
                    {
                        <a
                            className="mx-2 h6"
                            href={props.singleProject.link}
                            target="blank"
                        >
                            {props.singleProject.link}
                        </a>
                    }
                    ]
                </span>
            </div>
            <div className="mx-5 my-2">{props.singleProject.description}</div>
            <div className="mx-5 my-3 tech-data">
                {props.singleProject.tech.split(",").map((singleTech) => (
                    <Badge className="mr-3" variant="warning">
                        <p className="h5 mx-2">{singleTech}</p>
                    </Badge>
                ))}
            </div>
        </div>
    );
};

const Project = () => {
    const [projects, setProjects] = useState([]);

    const [showProjectModal, setProjectModalVisibility] = useState(false);

    async function fetchProjects() {
        let config = {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        };
        try {
            const response = await axios.get(
                "https://coderstoryapi.herokuapp.com/api/projects",
                config
            );
            setProjects(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    const addProject = () => {
        setProjectModalVisibility(false);
        setProjects([]);
        fetchProjects();
        window.scrollTo(0, 0);
    };

    return (
        <Styles>
            <p className="display-4 text-center">Projects</p>
            <Button
                variant="outline-primary"
                className="my-2"
                onClick={() => setProjectModalVisibility(true)}
            >
                Add a Project
            </Button>
            <AddProjectModal
                show={showProjectModal}
                addProject={addProject}
                hideModal={() => setProjectModalVisibility(false)}
            />
            {projects
                .slice(0)
                .reverse()
                .map((singleProject) => (
                    <ProjectCard
                        singleProject={singleProject}
                        updateProject={addProject}
                        deleteProject={addProject}
                    />
                ))}
            <hr />
            <p className="display-4 text-center my-5">
                Most Popular Project Genres.
            </p>
            <Table>
                <tbody>
                    <tr>
                        <td>
                            <div
                                className="fa fa-android fa-5x"
                                style={{ color: "#3DDC84" }}
                            ></div>
                        </td>
                        <td>
                            <p>
                                Android is a mobile operating system based on a
                                modified version of the Linux kernel and other
                                open source software, designed primarily for
                                touchscreen mobile devices such as smartphones
                                and tablets. Android is developed by a
                                consortium of developers known as the Open
                                Handset Alliance and commercially sponsored by
                                Google. It was unveiled in 2007, with the first
                                commercial Android device launched in September
                                2008.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div
                                className="fa fa-apple fa-5x"
                                style={{ color: "#A3AAAE" }}
                            ></div>
                        </td>
                        <td>
                            <p>
                                iOS is a mobile operating system created and
                                developed by Apple Inc. exclusively for its
                                hardware. It is the operating system that powers
                                many of the company's mobile devices, including
                                the iPhone and iPod Touch; it also powered the
                                iPad until the introduction of iPadOS in 2019.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div
                                className="fa fa-linux fa-5x"
                                style={{ color: "black" }}
                            ></div>
                        </td>
                        <td>
                            <p>
                                Linux is a family of open source Unix-like
                                operating systems based on the Linux kernel, an
                                operating system kernel first released on
                                September 17, 1991, by Linus Torvalds. Linux is
                                typically packaged in a Linux distribution.
                                Distributions include the Linux kernel and
                                supporting system software and libraries, many
                                of which are provided by the GNU Project. Many
                                Linux distributions use the word "Linux" in
                                their name, but the Free Software Foundation
                                uses the name GNU/Linux to emphasize the
                                importance of GNU software, causing some
                                controversy.
                            </p>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Styles>
    );
};

export default Project;
