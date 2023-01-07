import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [newtitle,setTitle]=useState("");
  const [newdescription,setDescription]=useState("");
  const [newtopicsarr,setTopics]=useState([]);
  const[newtopic,setTopic]=useState("");
  const [showAgendaBlock,setShowAgendaBlock]=useState(false);
  const[addedagenda,setAddedagenda]=useState([
    {
      title:"Angular",
      description:"some description about the Angular",
      topics:["Introduction","Typescript","why angular?","Understaing versions","fundamentals"]
    },
    {
      title:"Vue",
      description:"some description about the vue",
      topics:["Introdution","javascript","Why Vue","component Interaction"]
    }
  ])

  const checkAgendafun=()=>{
 showAgendaBlock===false?setShowAgendaBlock(true):setShowAgendaBlock(false);
  }
  const titlefunction=(e)=>{
    setTitle(e.target.value);
    
  }
const desfunction=(e)=>{
  setDescription(e.target.value);
}
const topicfunction=(e)=>{
  setTopic(e.target.value);
}
const addfunction=(e)=>{
  e.preventDefault();
  setTopics([...newtopicsarr,newtopic]);
  setTopic('');
}
const Agendafunction=(e)=>{
e.preventDefault();
  const data={
    title:newtitle,
    description:newdescription,
    topics:newtopicsarr
  }
  setAddedagenda([...addedagenda,data]);
  setTitle('');
  setTopics([]);
  setDescription('');
  setTopic('');
}

  return (
    <div>
      <h1 className="mx-5 mb-5">Agenda manager</h1>
  {
      !showAgendaBlock &&
      <div className="container">
        <button className="btn btn-info" onClick={checkAgendafun} >Click to view Agenda</button>

        <form onSubmit={Agendafunction}>
          <div className="my-3">
            <label className="form-label">Title</label>
            {/*title */}
            <input type="text"  placeholder="Enter the title " className="form-control" value={newtitle}
            onChange={(event)=>{
              titlefunction(event);
            }}/>
            <small className="text-danger">
              {/**
               * show empty string if title input is valid
               * else show "Title is required"
               */
               newtitle.trim().length===0?"Title is required":""
              }
            </small>
          </div>
          <div className="my-3">
            <label className="form-label">Description</label>
            {/**description */}
            <input type="text" placeholder="Enter the description" className="form-control" 
            value={newdescription} onChange={(event)=>{desfunction(event)}}/>
            <small className="text-danger">
              {
                /**
               * show empty string if title input is valid
               * else show "Description is required"
               */
              newdescription.trim().length===0?"Description is required":""
              }
            </small>
          </div>
          <div className="my-3 w-50">
            <label className="form-label">Enter topic</label>
            {/*topic */}
            <input type="text" name="newTopic" placeholder="Enter the topic " className="form-control"
            value={newtopic} onChange={(event)=>{
              topicfunction(event);
            }}/>
            <small className="text-danger">
           { /**
               * show empty string if title input is valid
               * else show "Topic is required"
               */
              newtopic.trim().length===0&&newtopicsarr.length===0?"Topic is required":""
            }
            </small>
          </div>
          {/**on click  should add topics and disable button if invalid topic */}
          <button className="btn btn-sucess addAlign" onClick={(event)=>{
            addfunction(event);
          }}
          >+ Add Topic</button>
          {/**on click should add agenda details and disable the button if  invalid inputs */}
          <button className="btn btn-success submitAlign"
           disabled={newtitle.trim().length===0||newdescription.trim().length===0
          ||newtopicsarr.trim().length===0}
          
          >Submit Agenda</button>
        </form>
            {/*show if no topics added yet */
            newtopicsarr.length===0&&
            <div className="text-danger ml-2 mt-5">No Topics Added</div>
           }
            {/*display the list of topics added in li */
            newtopicsarr.length!==0&&
            <div className="card my-3">
              <div className="card-header">Added Topics</div>
              <div className="card-body">
                <ul className="list-group">
                {newtopicsarr.map(topic=>{
                  return(<li className="list-group-item">{topic}</li>)
                })
                }
                </ul>
              </div>
              <div className="card-footer">Refer the topics you added</div>
            </div>
  }
      </div>
}
      {showAgendaBlock &&
      <div className="container" >
        <button className="btn btn-info" onClick={checkAgendafun} >click To add agenda</button>
        {/*itreate the agenda details to display */
        addedagenda.map(agenda=>{
          return(
            <div className="card my-3 ">
            <div className="card-header">
              {agenda.title}
            </div>
            <div className="card-body">
              <ul className="list-group">
                {/**iterate the topics to display */
                agenda.topics.map(t=>{
                  return(
                    <li className="list-group-item">
                  {t}
                </li>
                  )
                })}
              </ul>
            </div>
            <div className="card-footer">
              {agenda.description}
            </div>
          </div>
          )
        })}
        
      </div>
      }
    </div>
  );
}

export default App;
