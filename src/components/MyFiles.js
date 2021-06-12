import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import NavigationBar from "./NavigationBar";
import { database, storage } from "../firebase";
import FilesRow from "../components/FilesRow";
import firebase from "firebase/app";
import {Button} from 'react-bootstrap'


export default function MyFiles() {
	const [arr, setArr] = useState([]);
	const { currentUser } = useAuth();
	const [loading, toggleLoading] = useState(true);
	const [dataFetched, setDataFetched] = useState(false);
	const databaseUserLinksRef = database.users
		.doc(currentUser.uid)
		.collection("links");
	const [selected, setSelected] = useState([]);
	const [selectAllBool, setSelectAll] = useState(0);
	const [arrowOrientation, setArrow] = useState([0, 0, 0]); //name,date,size
	const [update, setUpdate] = useState(0);
	const [dateSort, setDateSort] = useState("descending");
	const [nameSort, setNameSort] = useState("ascending");
	const [sizeSort, setSizeSort] = useState("ascending");
	const [confirm, setConfirm] = useState(false);
	const [pressed, setPressed] = useState(0);
  let timer;
  console.log("render myfiles")
	useEffect(() => {
		if (loading === true) loadFile();
    
	}, []);


	async function loadFile() {
		console.log("Load File");
		await databaseUserLinksRef.get().then((coll) => {
			const sorted = coll.docs.sort(
				(a, b) => b.data().preciseDate.toDate() - a.data().preciseDate.toDate()
			);
			setDataFetched(true);
			setArr([...sorted]);
		});

		toggleLoading(false);
	}
  function togglePressed(doc) {
		if (pressed === 1) {
			setPressed(0);
		} else if (pressed === 0) {
			setPressed(1);
		}
	}


	function deleteFile() {
		
		console.log("Deleted");
		selected.forEach(async (fileid) => {
			await databaseUserLinksRef.doc(fileid).delete();
			await database.links.doc(fileid).delete();
			database.users.doc(currentUser.uid).update({
				linksCreated: firebase.firestore.FieldValue.increment(-1),
				totalFileSize: firebase.firestore.FieldValue.increment(
					-arr.filter((x) => x.id === fileid)[0].data().size
				),
			});
			storage
				.ref(`${fileid}`)
				.list()
				.then((x) => {
					x.items.forEach((item) => {
						storage.ref(item.fullPath).delete();
					});
				});
		});
		setArr((prev) => prev.filter((x) => !selected.includes(x.id)));
		setSelected([]);
    setConfirm(false)
	}


	function sortByDate(e) {
		e.preventDefault();
		if (dateSort === "ascending") {
			const sorted = arr.sort(
				(a, b) => a.data().preciseDate.toDate() - b.data().preciseDate.toDate()
			);
			setArr([...sorted]);
			setDateSort("descending");
			setArrow([0, 1, 0]);
		} else {
			const sorted = arr.sort(
				(a, b) => b.data().preciseDate.toDate() - a.data().preciseDate.toDate()
			);
			setArr([...sorted]);
			setDateSort("ascending");
			setArrow([0, 0, 0]);
		}
	}
	function sortBySize(e) {
		e.preventDefault();
		if (sizeSort === "ascending") {
			const sorted = arr.sort((a, b) => a.data().size - b.data().size);
			setArr([...sorted]);
			setSizeSort("descending");
			setArrow([0, 0, 1]);
		} else {
			const sorted = arr.sort((a, b) => b.data().size - a.data().size);
			setArr([...sorted]);
			setSizeSort("ascending");
			setArrow([0, 0, 0]);
		}
	}
	function sortByName(e) {
		e.preventDefault();
		if (nameSort === "descending") {
			const sorted = arr.sort((a, b) => (a.id > b.id ? 1 : -1));
			setArr([...sorted]);
			setNameSort("ascending");
			setArrow([1, 0, 0]);
		} else {
			const sorted = arr.sort((a, b) => (a.id > b.id ? -1 : 1));
			setArr([...sorted]);
			setNameSort("descending");
			setArrow([0, 0, 0]);
		}
	}
	function selectAll(e) {
		e.preventDefault();
		if (selectAllBool === 0) {
			setSelectAll(1);
      setPressed(1)
			setSelected(
				arr.map((doc) => {
					return doc.id;
				})
			);
		} else {
      setPressed(0)
			setSelectAll(0);
			setSelected([]);
		}
	}
  function mousedown(e){
    e.preventDefault();
    timer=setTimeout(()=>{
      console.log("pretend delete")
      deleteFile();
    },1100)
    
    
    
  }
	return (
		<>
			<NavigationBar />

			<div className="files-page">
				{/* <button onClick={test}>TEST</button> */}
				<h1>
          <span>Files</span>
        {selected.length > 0 && (
						<>
            
              <Button variant="dark" onMouseDown={mousedown} onMouseUp={()=>{clearTimeout(timer)}}><span>Hold to delete</span></Button>
              
							
              
						</>
					)}
        </h1>
				<div className="files-container">
					
					<div className="files-inner-header">
						<div className="header-select">
							<div className="checkbox" onClick={selectAll} pressed={pressed}>
                <svg focusable="false" viewBox="0 0 24 24"><path strokeWidth="3.4"  d="M4.1,12.7 9,17.6 20.3,6.3" fill="none" stroke={selectAllBool ? "white" : "#F6F7F9"}></path></svg>

              </div>
						</div>
						<div className="header-name" onClick={sortByName}>
							Name
							<svg
								className="svg-up"
								orientation={arrowOrientation[0]}
								viewBox="0 0 20 20"
							>
								<path
									fill="none"
									d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"
								></path>
							</svg>
						</div>
						<div className="header-desc">Description</div>
						<div className="header-date" onClick={sortByDate}>
							Date Created
							<svg
								className="svg-up"
								orientation={arrowOrientation[1]}
								viewBox="0 0 20 20"
							>
								<path
									fill="none"
									d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"
								></path>
							</svg>
						</div>
						<div className="header-size" onClick={sortBySize}>
							Size
							<svg
								className="svg-up"
								orientation={arrowOrientation[2]}
								viewBox="0 0 20 20"
							>
								<path
									fill="none"
									d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"
								></path>
							</svg>
						</div>
					</div>
					<div style={{ minHeight: "80vh" }}>
						{dataFetched &&
							[...arr].map((doc, index) => {
								return (
									<FilesRow
										doc={doc}
										select={setSelected}
										selectAllBool={selectAllBool}
										key={doc.id}
									/>
								);
							})}
					</div>
				</div>
			</div>
		</>
	);
}
