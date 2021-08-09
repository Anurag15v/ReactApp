import React,{useState,useEffect} from 'react'
import './Dashbaord.css'
import {useHistory} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import IconButton from "@material-ui/core/IconButton";
    var new_message,i=0;  
    const useStyles = makeStyles((theme) => ({
        root: {
          maxWidth: 345
        },
        media: {
          height: 0,
          paddingTop: "56.25%" 
        }
      }));         
const Dashboard = () => {
    const classes = useStyles();
     const history=useHistory();
     const [data,storedata]=useState(
         {
            message:""
         }
     );
     const [message_list,storelist]=useState(
         [{
            message:""
         }]
     );
     const [like,setlike]=useState(0)
     const [dislike,setdislike]=useState(0)
     const [like_id,setlike_id]=useState([])
     const [dislike_id,setdislike_id]=useState([]) 
     let name,value;
     const datahandle=(e)=>
     {
       name=e.target.name;
       value=e.target.value;
       storedata({...data,[name]:value});
     }
  const callDashboard=async(e)=>
    { 
        e.preventDefault();
        const {message}=data;
        new_message=message;
     try
     {
      const res=await fetch('/',
      { 
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              message ,
              like,
              like_id,
              dislike,
              dislike_id 
          })
          
      })
    const data=await res.json();
      if(!res.status===200||!data)
      {  
          const error=new Error(res.error)
          throw error;
      }
      else{
          storedata({...data,message:""})}
          getter()
    }
     catch(err)
     {
      console.log(err);
      history.push('/login');
     }
    }
    useEffect(()=>
    {
      fetch('/getter').then(res=>
        { 
            if(res.ok)
            return res.json()
        }).then(jsonRes=>
            {
                storelist(jsonRes);
            })
    },[])
    function getter()
    {
        fetch('/getter').then(res=>
            { 
                if(res.ok)
                return res.json()
            }).then(jsonRes=>
                {
                    storelist(jsonRes);
                })
              }
    return (
        <div>
            <form method="POST">
            <h1 className="welcome">WELCOME</h1>
            <div className="lister">
            <input id="input_box" value={data.message} placeholder="Type Your Post" name="message" onChange={datahandle} type="text" className="text_box"/>
            <input value="Share" type="submit" onClick={callDashboard} className="button"/>
           </div> 
            </form>
            <div className="message_list"> 
            {message_list.map(element=>{
                    if(element.messages!==undefined && element.messages.length!==0)
                    { 
                    return element.messages.map((messenger,index)=>(<div className="messager" key={index}>
                        <Card className={classes.root}>
       <CardHeader
        avatar={
          <Avatar style={{backgroundColor:"blueviolet"}} >
            {element.Name.charAt(0)}
          </Avatar>
        }
        action={
            <IconButton aria-label="edit">
              <EditIcon onClick={async()=>
                        {   i++; 
                             setlike(messenger.like);
                            setlike_id(messenger.like_id)
                            setdislike(messenger.dislike);
                            setdislike_id(messenger.dislike_id);
                            window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                          });
                               try
                             { 
                                 const res=await fetch('/delete',
                                { 
                                    method:"POST",
                                    headers:{
                                        "Content-Type":"application/json"
                                    },
                                    body:JSON.stringify({
                                      index:index,  
                                      id:element._id,
                                      message:messenger.message
                                    })
                                    
                                })
                                var data1=await res.json();
                              if(!res.status===200||!data)
                              {  
                                  const error=new Error(res.error)
                                  throw error;
                              }
                            }
                            catch(err)
                             {
                              console.log(err);
                              }
                              if(data1.message!=="Not Delete successfull")
                              { 
                                 storedata(messenger.message) 
                                document.getElementById("input_box").
                                value=messenger.message;
                              try{
                              const res1=await fetch('/edit',
                              {  
                                  method:"POST",
                                  headers:{
                                      "Content-Type":"application/json"
                                  },
                                  body:JSON.stringify({
                                    index:index,  
                                    id:element._id,
                                    message:messenger.message,
                                    new_message:data.message
                                  })
                                
                              })
                              const data=await res1.json();
                              console.log(data)
                              if(!res1.status===200||!data)
                              {  
                                  const error=new Error(res1.error)
                                  throw error;
                              }
                             }
                             catch(err)
                             {
                              console.log(err);
                              }
                                } 
                                getter(); 
                         }}/>
            </IconButton>
          }
        title={element.Name}
        subheader={element.Email}
      /> 
       <CardContent>
        <Typography  variant="body2" color="textSecondary" component="p">
          {messenger.message}
        </Typography>
      </CardContent>
       <CardActions disableSpacing>
      
    <IconButton aria-label="like">
                     <ThumbUpAltIcon  onClick={async()=>
                        {   
                            try{
                                const res1=await fetch('/like',
                                {  
                                    method:"POST",
                                    headers:{
                                        "Content-Type":"application/json"
                                    },
                                    body:JSON.stringify({
                                      index:index,  
                                      id:element._id,
                                      message:messenger.message
                                    })
                                    
                                })
                                const data=await res1.json();
                                if(!res1.status===200)
                                {  
                                    const error=new Error(res1.error)
                                    throw error;
                                }
                               }
                               catch(err)
                               {
                                console.log(err);
                                }
                                getter();
                        }}/></IconButton><span>{messenger.like}</span><IconButton aria-label="dislike"><ThumbDownIcon onClick={async()=>
                        {
                            try{
                                const res1=await fetch('/dislike',
                                {  
                                    method:"POST",
                                    headers:{
                                        "Content-Type":"application/json"
                                    },
                                    body:JSON.stringify({
                                      index:index,  
                                      id:element._id,
                                      message:messenger.message
                                    })
                                    
                                })
                                const data=await res1.json();
                                if(!res1.status===200)
                                {  
                                    const error=new Error(res1.error)
                                    throw error;
                                }
                               }
                               catch(err)
                               {
                                console.log(err);
                                }
                                getter();
                        }}
                        /></IconButton><span >{messenger.dislike}</span>
                        <IconButton aria-label="delete">
          <DeleteIcon onClick={async()=>
                    {   
                         try
                         {
                          const res=await fetch('/delete',
                          { 
                              method:"POST",
                              headers:{
                                  "Content-Type":"application/json"
                              },
                              body:JSON.stringify({
                                index:index,  
                                id:element._id,
                                message:messenger.message
                              })
                              
                          })
                          const data=await res.json();
                          if(!res.status===200||!data)
                          {  
                              const error=new Error(res.error)
                              throw error;
                          }
                         }
                         catch(err)
                         {
                          console.log(err);
                          }
                          getter();
                     } }/>
        </IconButton></CardActions></Card> </div>
                     )) 
                }  
                else
                {
                    return null;
                }
}) }
            </div>
            
        </div>
    )
}

export default Dashboard
