import React, { useContext, useEffect } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { LoadingContext } from "../../contexts/loadingContext";
import axios from "axios";
import { AuthContext } from "../../contexts/authContext";


const columns = [
    { headerName: "ID" },
    {
        headerName: "Name",
    },
    {
        headerName: "Role",
    },
    {
        headerName: "Action",
    },
];

export default function Users() {
    const [data, setData] = React.useState([]);
    const { setLoading } = useContext(LoadingContext)
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const getProduct = async () => {

        axios.get('user/all').then((res) => {
            setData(res.data.users)
        }).catch((err) => {
            console.log(err)
        })

    };

    const deleteProduct = async (body) => {

        setLoading(true)
        await axios.patch('user/update-status', body).then((res) => {
            console.log(res)
            getProduct()
        }).catch((err) => {
            console.log(err)
        })
        setLoading(false)

    }

    useEffect(() => {

        const getProduct = async () => {

            axios.get('user/all').then((res) => {
                setData(res.data.users)
            }).catch((err) => {
                console.log(err)
            })

        };

        getProduct();

    }, []);

    return (
        <div>
            <div className="my-4 flex flex-row px-6 justify-between">
                <h1 className=" text-2xl font-semibold mr-2">Users</h1>
            </div>
            <div className="block py-2 px-4  mx-1 md:mx-2 rounded-md">
                <div></div>

                <div className="flex justify-center">
                    <table>
                        <thead>
                            {columns.map((column, index) => (
                                <th key={index}>{column.headerName}</th>
                            ))}
                        </thead>
                        {
                            data.length === 0 && (
                                <tbody>
                                    <tr>
                                        <td colSpan={columns.length} className="text-center">
                                            No data found
                                        </td>
                                    </tr>
                                </tbody>
                            )

                        }
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td data-label="id">{index + 1}</td>
                                    <td data-label="id">{row?.name}</td>
                                    <td data-label="id" className="capitalize">{row?.role}</td>
                                    <td data-label="id" className="capitalize">{row?.status}</td>
                                    <td data-label="action">
                                        {
                                            (row.status === "blocked") && (
                                                <p>Blocked</p>
                                            )
                                        }

                                        {
                                            (row.status === "rejected") && (
                                                <p>Rejected</p>
                                            )
                                        }

                                        {
                                            (row.status === "pending") && (
                                                <>
                                                    <button
                                                        onClick={
                                                            () => deleteProduct({
                                                                userId: row._id,
                                                                status: "rejected",
                                                            })
                                                        }

                                                        className="bg-[red] text-white px-2 py-1 rounded-md ml-2"
                                                    >
                                                        Reject
                                                    </button>
                                                    <button
                                                        onClick={
                                                            () => deleteProduct({
                                                                userId: row._id,
                                                                status: "active",
                                                            })
                                                        }
                                                        className="bg-[#79B84E] text-white px-2 py-1 rounded-md ml-2"
                                                    >
                                                        Approve
                                                    </button>
                                                </>
                                            )
                                        }
                                        {
                                            row.status === "active" && (
                                                <button
                                                    onClick={() => deleteProduct({
                                                        userId: row._id,
                                                        status: "blocked",
                                                    })}
                                                    className="bg-[#268FCD] text-white px-2 py-1 rounded-md">
                                                    Block
                                                </button>
                                            )
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
