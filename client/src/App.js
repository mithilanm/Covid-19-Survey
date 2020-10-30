import React, { useState, useEffect }  from 'react';
import './App.css';
import "survey-react/survey.css"
import * as Survey from "survey-react";

function onComplete(result){
  //console.log("Result JSON:\n" + JSON.stringify(result.data));
  //parseData(JSON.stringify(result.data, null, 3))
  //console.log("Result JSON:\n" + JSON.stringify(modifySurveyResults(result)))
  var values =  modifySurveyResults(result)
  let data = values.resultData;
  let output_data = values.output;
  console.log(JSON.stringify(output_data))
  data.forEach((item) => {
    if(item.question_id!=1){
      var info = JSON.stringify(item)
      var request = new XMLHttpRequest();
      request.open('POST', '/Survey', true);
      request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      request.send(info);
    }
  })
  output_data.forEach((result_item) => {
    var resultOutput = JSON.stringify(result_item)
    var request = new XMLHttpRequest();
    request.open('POST', '/Survey_Results', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(resultOutput);
  })
}

function onValueChanged(result) {
    console.log("value changed!");
}
var json = {
      "title": "FirstDash Employee Wellness Survey",
      "description": "Thank you for taking the time to complete this survey. Your cooperation is appreciated!",
      showProgressBar: "bottom",
      goNextPageAutomatic: true,
      showNavigationButtons: true,
      "pages": [
          {
            name:"page1", "elements": [
              { 
                    "type": "radiogroup",
                    "name": "1",
                    "title": "Are you an employee, returning visitor, new visitor?",
                    choices: [
                      "Employee", "Returning Visitor", "New Visitor"
                    ],
                    "hideNumber": false,
                      isRequired: true,
              }
            ]
          }, 
          {
           name:"page3", visibleIf:"{1}='Employee'", "elements": [
                { 
                      "type": "text",
                      "name": "2",
                      "title": "Email",
                      "inputType": "email",
                      "hideNumber": false,
                       isRequired: true,
                       validators: [
                      {
                       type: "email"
                       }
                      ]
                },
              ]
          }, {
           name:"page4", visibleIf:"{1}='Returning Visitor'", "elements": [
                { 
                      "type": "text",
                      "name": "3",
                      "title": "Name of person you are here to see?",
                      "inputType": "text",
                      "hideNumber": false,
                       isRequired: true,
                },
                { 
                      "type": "text",
                      "name": "2",
                      "title": "Email",
                      "inputType": "email",
                      "hideNumber": false,
                       isRequired: true,
                       validators: [
                      {
                       type: "email"
                       }
                      ]
                },
              ]
          }, {
            name:"page5", visibleIf:"{1}='New Visitor'","elements": [
                { 
                      "type": "text",
                      "name": "4",
                      "title": "Name",
                      "inputType": "text",
                      "hideNumber": false,
                       isRequired: true,
                },
                { 
                      "type": "radiogroup",
                      "name": "5",
                      "title": "Sex",
                      choices: [
                        "Male", "Female"
                      ],
                      "hideNumber": false,
                        isRequired: true,
                },
                { 
                      "type": "text",
                      "name": "6",
                      "title": "Work Address",
                      "hideNumber": false,
                        isRequired: true,
                },
                { 
                      "type": "text",
                      "name": "7",
                      "title": "City",
                      "hideNumber": false,
                        isRequired: true,
                },
                { 
                      "type": "text",
                      "name": "8",
                      "title": "Province",
                      "hideNumber": false,
                        isRequired: true,
                },
                { 
                      "type": "text",
                      "name": "9",
                      "title": "Postal Code",
                      "hideNumber": false,
                        isRequired: true,
                },
                { 
                      "type": "text",
                      "name": "2",
                      "title": "Email",
                      "inputType": "email",
                      "hideNumber": false,
                       isRequired: true,
                       validators: [
                      {
                       type: "email"
                       }
                      ]
                },
                { 
                      "type": "text",
                      "name": "10",
                      "title": "Work Phone",
                      "hideNumber": false,
                        isRequired: true,
                },
                { 
                      "type": "text",
                      "name": "11",
                      "title": "Company Name",
                      "hideNumber": false,
                        isRequired: true,
                },
                { 
                      "type": "text",
                      "name": "3",
                      "title": "Name of person you are here to see?",
                      "hideNumber": false,
                        isRequired: true,
                },
              ]
          }, {
            name:"page6", "elements": [
                {
                    "type": "radiogroup",
                    "name": "12",
                    "title": "Difficulty breathing or shortness of breath",
                    "choices": ["Yes", "No"]
                }, 
                {
                  "type": "radiogroup",
                  "name": "13",
                  "title": "Cough",
                  "choices": ["Yes", "No"]
                }, {
                  "type": "radiogroup",
                  "name": "14",
                  "title": "Sore throat, trouble swallowing",
                  "choices": ["Yes", "No"]
                }, {
                  "type": "radiogroup",
                  "name": "15",
                  "title": "Runny nose/ stuffy nose or nasal congestion",
                  "choices": ["Yes", "No"]
                }, {
                  "type": "radiogroup",
                  "name": "16",
                  "title": "Decrease or loss of smell or taste",
                  "choices": ["Yes", "No"]
                }, {
                  "type": "radiogroup",
                  "name": "17",
                  "title": "Nausea, vomiting, diarrhea, abdominal pain",
                  "choices": ["Yes", "No"]
                }, {
                        "type": "radiogroup",
                        "name": "18",
                        "title": "Have you travelled outside of Canada in the past 14 days?",
                        "choices": ["Yes", "No"]
                }, {
                        "type": "radiogroup",
                        "name": "19",
                        "title":"Have you had close contact with a confirmed or probable case of COVID-19?",
                        "choices": ["Yes", "No"]
                }, {
                        "type": "radiogroup",
                        "name": "20",
                        "title":"I believe the answers stated in this wellness survey are true",
                        "choices": ["Yes", "No"]
                }, {
                        "type": "html",
                        "name": "results",
                        "html": "<article class='intro'>  <h1 class='intro__heading intro__heading--income title'>Results of Screening Questions: </h1><ul> \t<li> If the individual answers NO to all questions from 1 through 8, they passed and can enter the workplace \t</li> \t<li>\t\t<p>If the individual answers YES to any questions from 1 through 8, they have not PASSED and should be advised that they should not enter the workplace (including any outdoor, or partially outdoor, workplaces). They should go home to self-isolate immediately and contact their health care provider or Telehealth Ontario (1 866-797-0000) to find out if they need a COVID-19 test.</p> \t\t</li></div> </article>"
                } 
            ]
          }
      ],
      "showQuestionNumbers": "off"
  };


  function modifySurveyResults(survey) {
    var resultData = [];
    var output = [];
    var fail = 0
    for(var key in survey.data) {
      var question = survey.getQuestionByValueName(key);
      if(!!question) {
        if(question.name=="2"){
          var email = question.value;
        }
        if(question.name=="20" && question.value=="No"){
          fail=1
        }
        else{
          if(question.name!="20" && question.value=="Yes"){
            fail = 1
          }
          var item = { answer: question.value, question_id: question.name, email: email };
          resultData.push(item);
        }
      }
    }
    item = { email: email, date: new Date().toISOString().slice(0, 10), pass_type: fail }
    output.push(item);
    return {
      resultData, 
      output
    };
  }


  function App() {
    var model = new Survey.Model(json);
    return (
      <div className="container">
        <Survey.Survey
          model={model}
          onComplete={onComplete}
          onValueChanged={onValueChanged}
        />
      </div>
    );
  }

  export default App;