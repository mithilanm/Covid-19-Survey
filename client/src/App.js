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
      "pages": [
          {
              "name": "page1",
              "elements": [
                { 
                      "type": "text",
                      "name": "1",
                      "title": "Employee ID",
                      "inputType": "number",
                      "hideNumber": false
                },
                { 
                      "type": "text",
                      "name": "2",
                      "title": "Email",
                      "inputType": "email",
                      "hideNumber": false,
                       validators: [
                      {
                       type: "email"
                       }
                      ]
                },
                {
                    "type": "radiogroup",
                    "name": "3",
                    "title": "Difficulty breathing or shortness of breath",
                    "choices": ["Yes", "No"]
                }, 
                {
                  "type": "radiogroup",
                  "name": "4",
                  "title": "Cough",
                  "choices": ["Yes", "No"]
                }, {
                  "type": "radiogroup",
                  "name": "5",
                  "title": "Sore throat, trouble swallowing",
                  "choices": ["Yes", "No"]
                }, {
                  "type": "radiogroup",
                  "name": "6",
                  "title": "Runny nose/ stuffy nose or nasal congestion",
                  "choices": ["Yes", "No"]
                }, {
                  "type": "radiogroup",
                  "name": "7",
                  "title": "Decrease or loss of smell or taste",
                  "choices": ["Yes", "No"]
                }, {
                  "type": "radiogroup",
                  "name": "8",
                  "title": "Nausea, vomiting, diarrhea, abdominal pain",
                  "choices": ["Yes", "No"]
                }, {
                        "type": "radiogroup",
                        "name": "9",
                        "title": "Have you travelled outside of Canada in the past 14 days?",
                        "choices": ["Yes", "No"]
                }, {
                        "type": "radiogroup",
                        "name": "10",
                        "title":"Have you had close contact with a confirmed or probable case of COVID-19?",
                        "choices": ["Yes", "No"]
                }, {
                        "type": "radiogroup",
                        "name": "11",
                        "title":"I believe the answers stated in this wellness survey are true",
                        "choices": ["Yes", "No"]
                }, {
                        "type": "html",
                        "name": "results",
                        "html": "<article class='intro'>  <h1 class='intro__heading intro__heading--income title'>Results of Screening Questions: </h1><ul> \t<li> If the individual answers NO to all questions from 1 through 3, they passed and can enter the workplace \t</li> \t<li>\t\t<p>If the individual answers YES to any questions from 1 through 3, they have not PASSED and should be advised that they should not enter the workplace (including any outdoor, or partially outdoor, workplaces). They should go home to self-isolate immediately and contact their health care provider or Telehealth Ontario (1 866-797-0000) to find out if they need a COVID-19 test.</p> \t\t</li></div> </article>"
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
        if(question.name=="1"){
          var employee = question.value;
        }
        if(question.name=="2"){
          var email = question.value;
        }
        else{
          if((question.name == "3" && question.value=="Yes") || (question.name == "4" && question.value=="Yes") || (question.name == "5" && question.value=="Yes")){
            fail = 1
          }
          var item = {answer: question.value, question_id: question.name, employee_id: employee, email: email };
          resultData.push(item);
        }
      }
    }
    item = { vip_id: employee, email: email, time: new Date().toISOString().slice(0, 19).replace('T', ' '), pass_type: fail }
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