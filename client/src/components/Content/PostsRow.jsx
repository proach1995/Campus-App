/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';


const PostsRow = ({postElement}) => {

  console.log("data");
  console.log(postElement);
  
  var postImagesHelper = [];
  const [postImages, setPostImages] = useState([]);
  


    useEffect(()=>{

  //Genauso wie oben können bilder Selektiert und gemappt werden
  //1 Post mit mehreren Bildern muss genauso abgespeichert werden
    let postIdMemory = 0;
    let innerIndex = 0;
   {/* console.log("filter");
    console.log(postElement); */}
    console.log("postRow:", postElement);
    
    postElement.map((item) =>{

      //Check ob die ID ein 2.mal vorkommt
      //kommt das 1. mal vor
      if(postIdMemory !==item.postid){
        innerIndex = innerIndex+1;
        postIdMemory = item.postid;
        postImagesHelper.push({imagePath:item.imagepath, postTitle:item.posttitle});
      }
    })

  //Kontrollausgabe
 // console.log("Konrollaugabe");
  postImagesHelper.map((post) =>{
      //console.log(post.imagePath)
    });

 // console.log(postImagesHelper);
  setPostImages(postImagesHelper);
    },[postElement])

    console.log(postElement[0]);


  {/* Array.from(data) comes from props.data and is an object -> has to be converted into array to use .map*/}  
 return (
    
    <Container>
      <Row className="postRow">
        {postImages !=null && postImages.map((imageInfo, index) => {
          
              return (

        <div key = {index}>
        <Col className="col-6 col-md-6 col-lg-3 card" >
            <Link to={`/post/${imageInfo.postid}`}>
              <Card className="  text-center " style={{ width:'100px', height:"100px" }}>
              <Card.Img src={imageInfo.imagePath}/> 
              <Card.Body>
                  <Card.Title>{imageInfo.postTitle}</Card.Title>
                </Card.Body>
 
              </Card>
            </Link>
          </Col>
          </div>
        );
      })}
      </Row>
    </Container>
   
  );
};

export default PostsRow;


{/*

  //Testarray um doppelmäpping und anderes zu testen
 // let testArray =[
   // {array:[1] },
   // {array:[1, 2]},
   // {array:[1, 2, 3]},]

  //testarray um verschieden zu befüllen (2-dim array) und dan zu mappen  
  //var testArray2 =[];

  //Array um mit einer Schleife zu befüllen und dan zu mappen
  //var testArray3 =[];

  //Ist eine hilfsvariable diespäter den State zum rendern setzt
  var postImagesHelper = [];
  const [postImages, setPostImages] = useState([]);
  


    useEffect(()=>{

      //TEAM NOTIZ:
      //Die "Einschulung" kann gelöscht werden, wenn es sicher gemerkt und verstanden ist
      /* 
      console.log("testArray1");
      //doppelmäpping mit testarray
      testArray.map((item) =>{
        item.array.map((ele) =>{
        console.log(ele);
      });
    });

    //Array manuel füllen und doppeltesmappting
    console.log("testArray2");
    testArray2.push({array:[5]});
    testArray2.push({array:[5, 6]});
    testArray2.push({array:[5, 6, 7]});
    
    testArray2.map((item) =>{
      item.array.map((ele) =>{
      console.log(ele);
    });
  });

  //Array mit loop füllen und mappen
    console.log("testArray3");
    for(let i =0;i<3;i++){

      testArray3.push({array:[]});
      for(let j = 0;j<i+1;j++){
        testArray3[i].array.push(j);
      }
    }

    testArray3.map((item) =>{
      item.array.map((ele) =>{
      console.log(ele);
    });
  });
  
  //Genauso wie oben können bilder Selektiert und gemappt werden
  //1 Post mit mehreren Bildern muss genauso abgespeichert werden
  let postIdMemory = 0;
  let innerIndex = 0;
  console.log("filter");
  console.log(postElement); 
  
  postElement.map((item) =>{

    //Check ob die ID ein 2.mal vorkommt
    //kommt das 1. mal vor
    if(postIdMemory !==item.postid){
      innerIndex = innerIndex+1;
      postIdMemory = item.postid;
      postImagesHelper.push({imagePath:item.imagepath, postTitle:item.posttitle});
    }
  })

//Kontrollausgabe
// console.log("Konrollaugabe");
postImagesHelper.map((post) =>{
    //console.log(post.imagePath)
  });

// console.log(postImagesHelper);
setPostImages(postImagesHelper);
  },[postElement])




{/* Array.from(data) comes from props.data and is an object -> has to be converted into array to use .map  */}