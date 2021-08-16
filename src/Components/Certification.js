import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import moment from "moment";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Badge } from "react-bootstrap";

const Styles = styled.div`
    .certificate-card {
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

    .date-data {
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

const AddCertificationModal = (props) => {
    const [formData, setFormData] = useState({});

    const [expDate, setExpDate] = useState(null);

    const {
        id,
        CertificateName,
        CertificateId,
        CertificateProvider,
    } = formData;

    let modalHeader;
    let isupdateCertificate;
    if (props.certificateToUpdate) {
        modalHeader = "Update your certificate";
        isupdateCertificate = true;
    } else {
        modalHeader = "Add a certificate";
        isupdateCertificate = false;
    }

    useEffect(() => {
        if (isupdateCertificate) {
            setFormData({
                id: props.certificateToUpdate._id,
                CertificateName: props.certificateToUpdate.CertificateName,
                CertificateId: props.certificateToUpdate.CertificateId,
                CertificateProvider:
                    props.certificateToUpdate.CertificateProvider,
            });
            setExpDate(
                moment(props.certificateToUpdate.CertificateExpDate)
                    .toDate()
                    .toString() === "Invalid Date"
                    ? null
                    : new Date(
                          new Date(
                              moment(
                                  props.certificateToUpdate.CertificateExpDate
                              ).toDate()
                          ).toLocaleDateString("en-US", { timeZone: "Etc/UTC" })
                      )
            );
        }
    }, [isupdateCertificate, props]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const clearModal = () => {
        if (!isupdateCertificate) {
            setFormData({});
            setExpDate(null);
        }
        props.hideModal();
    };

    const addCertificate = async () => {
        let config = {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        };
        let CertificateExpDate =
            moment(expDate).format("yyyy-MM-DD") === "Invalid date"
                ? ""
                : moment(expDate).format("yyyy-MM-DD");
        let data = {
            CertificateName,
            CertificateId,
            CertificateProvider,
            CertificateExpDate,
        };
        try {
            await axios.post(
                "https://coderstoryapi.herokuapp.com/api/certificates",
                data,
                config
            );
            setFormData({});
            props.addCertificate();
        } catch (error) {
            console.log(error);
        }
    };

    const updateCertificate = async () => {
        let config = {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        };
        let CertificateExpDate =
            moment(expDate).format("yyyy-MM-DD") === "Invalid date"
                ? ""
                : moment(expDate).format("yyyy-MM-DD");
        let data = {
            id,
            CertificateName,
            CertificateId,
            CertificateProvider,
            CertificateExpDate,
        };
        try {
            await axios.put(
                "https://coderstoryapi.herokuapp.com/api/certificates",
                data,
                config
            );
            props.updateCertificate();
        } catch (error) {
            console.log(error);
        }
    };

    const DateCustomInput = ({ value, onClick }) => (
        <Form.Control
            onClick={onClick}
            value={value}
            placeholder="Enter Expiry Date"
        />
    );

    return (
        <Styles>
            <Modal {...props} size="lg">
                <Modal.Header className="display-4">{modalHeader}</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            className="my-3"
                            placeholder="Enter Certificate Name"
                            name="CertificateName"
                            onChange={onChange}
                            value={CertificateName}
                        ></Form.Control>
                        <Form.Control
                            className="my-3"
                            name="CertificateId"
                            onChange={onChange}
                            value={CertificateId}
                            placeholder="Enter Certificate Id"
                        ></Form.Control>
                        <Form.Control
                            className="my-3"
                            name="CertificateProvider"
                            onChange={onChange}
                            value={CertificateProvider}
                            placeholder="Enter Certificate Organization"
                        />
                        <DatePicker
                            selected={expDate}
                            onChange={(date) => setExpDate(date)}
                            dateFormat="yyyy-MM-dd"
                            showYearDropdown
                            isClearable
                            closeOnScroll={true}
                            customInput={<DateCustomInput />}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        hidden={isupdateCertificate}
                        variant="outline-primary"
                        onClick={addCertificate}
                    >
                        Add Certificate
                    </Button>
                    <Button
                        hidden={!isupdateCertificate}
                        variant="outline-primary"
                        onClick={updateCertificate}
                    >
                        Update Certificate
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
    const deleteCertificate = async (id) => {
        try {
            await axios.delete(
                "https://coderstoryapi.herokuapp.com/api/certificates",
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
            props.deleteCertificate();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Styles>
            <Modal {...props} size="lg">
                <Modal.Header className="display-4">
                    Delete "{props.singleCertificate.CertificateName}"?
                </Modal.Header>
                <Modal.Footer>
                    <Button
                        variant="outline-danger"
                        onClick={() =>
                            deleteCertificate(props.singleCertificate._id)
                        }
                    >
                        Delete Certificate
                    </Button>
                    <Button variant="outline-primary" onClick={props.hideModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Styles>
    );
};

const CertificationCard = (props) => {
    const [
        showUpdateCertificateModal,
        setUpdateCertificateModalVisibility,
    ] = useState(false);

    const [showDeleteModal, setDeleteModalVisibitlity] = useState(false);

    const deleteCertificate = () => {
        setDeleteModalVisibitlity(false);
        props.deleteCertificate();
    };

    return (
        <div className="certificate-card my-5">
            <AddCertificationModal
                show={showUpdateCertificateModal}
                certificateToUpdate={props.singleCertificate}
                updateCertificate={props.updateCertificate}
                hideModal={() => setUpdateCertificateModalVisibility(false)}
            />
            <DeleteModal
                show={showDeleteModal}
                singleCertificate={props.singleCertificate}
                hideModal={() => setDeleteModalVisibitlity(false)}
                deleteCertificate={deleteCertificate}
            />
            <div className="icons">
                <div
                    className="fa fa-2x fa-edit edit-icon"
                    onClick={() => setUpdateCertificateModalVisibility(true)}
                ></div>
                <div
                    className="fa fa-2x fa-trash trash-icon"
                    onClick={() => setDeleteModalVisibitlity(true)}
                />
            </div>
            <div>
                <span className="display-4">
                    {props.singleCertificate.CertificateName}
                </span>
                <span>
                    <br />
                    <Badge variant="warning">
                        {props.singleCertificate.CertificateId}
                    </Badge>
                </span>
            </div>
            <div className="my-2">
                By {props.singleCertificate.CertificateProvider}
            </div>
            <div className="my-3 date-data">
                Validity :{" "}
                {moment(props.singleCertificate.CertificateExpDate)
                    .utcOffset("+0000")
                    .format("MMMM Do YYYY") === "Invalid date"
                    ? "Always"
                    : moment(props.singleCertificate.CertificateExpDate)
                          .utcOffset("+0000")
                          .format("MMMM Do YYYY")}
            </div>
        </div>
    );
};

const Certification = () => {
    const [certificates, setCertificates] = useState([]);

    const [showCertificateModal, setCertificateModalVisibility] = useState(
        false
    );

    async function fetchCertificates() {
        let config = {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            },
        };
        try {
            const response = await axios.get(
                "https://coderstoryapi.herokuapp.com/api/certificates",
                config
            );
            setCertificates(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCertificates();
    }, []);

    const addCertificate = () => {
        setCertificateModalVisibility(false);
        setCertificates([]);
        fetchCertificates();
        window.scrollTo(0, 0);
    };

    return (
        <Styles>
            <p className="display-4 text-center">Certifications</p>
            <Button
                variant="outline-primary"
                className="my-2"
                onClick={() => setCertificateModalVisibility(true)}
            >
                Add a Certification
            </Button>
            <AddCertificationModal
                show={showCertificateModal}
                addCertificate={addCertificate}
                hideModal={() => setCertificateModalVisibility(false)}
            />
            {certificates
                .slice(0)
                .reverse()
                .map((singleCertificate) => (
                    <CertificationCard
                        singleCertificate={singleCertificate}
                        updateCertificate={addCertificate}
                        deleteCertificate={addCertificate}
                    />
                ))}
            <hr />
            <p className="display-4 text-center my-5">
                Most Popular Certifications.
            </p>
            <Table>
                <tbody>
                    <tr>
                        <td>
                            <div className="devicon-amazonwebservices-plain-wordmark colored fa-5x"></div>
                        </td>
                        <td>
                            <p>
                                AWS Certification validates cloud expertise to
                                help professionals highlight in-demand skills
                                and organizations build effective, innovative
                                teams for cloud initiatives using AWS. Choose
                                from diverse certification exams by role and
                                specialty designed to empower individuals and
                                teams to meet their unique goals.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="devicon-oracle-original colored fa-5x"></div>
                        </td>
                        <td>
                            <p>
                                The Oracle Certification Program certifies
                                candidates on skills and knowledge related to
                                Oracle products and technologies. Credentials
                                are granted based on a combination of passing
                                exams, training and performance-based
                                assignments, depending on the level of
                                certification. Oracle certifications are
                                tangible benchmarks of experience and expertise
                                that Oracle claims to help a participant stand
                                out in a crowd among employers. There are 6
                                levels of Oracle Certification credentials:
                                Oracle Certified Junior Associate (OCJA), Oracle
                                Certified Associate (OCA), Oracle Certified
                                Professional (OCP), Oracle Certified Master
                                (OCM), Oracle Certified Expert (OCE) and Oracle
                                Certified Specialist (OCS).
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="devicon-google-plain-wordmark colored fa-5x"></div>
                        </td>
                        <td>
                            <p>
                                Having end-to-end knowledge of Google Cloud
                                Platform without a GCP certification is like
                                knowing how to fly an aircraft, but not having a
                                flying license. If you want to get certified in
                                GCP, knowing the concepts about Google Cloud
                                would not be enough. You should know the
                                real-time problems faced while using GCP. The
                                value of your resume increases abundantly when
                                you show you are a Google Cloud certified
                                professional.
                            </p>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Styles>
    );
};

export default Certification;
