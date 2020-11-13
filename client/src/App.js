import React, { useState, useEffect }  from 'react';
import './App.scss';
import "survey-react/survey.css"
import * as Survey from "survey-react";
import Logo from './images/Logo.png';

function App() {
    const [devID,setDevID] = useState([{Id:null, company_code: null}]);
    const [company_choice, setCompanyChoice] = useState([{company_code: null, company_name: null, manager_login_id: null}]);
    const [company, setCompany] = useState([{company_code: null, company_name: null, manager_login_id: null}]);
    var company_name;
    useEffect(() => {   
      fetch('/company_choice')
      .then(response => response.json())
      .then(response => setCompanyChoice(response.data))
      .catch(err => console.log(err))

      fetch('/company')
      .then(response => response.json())
      .then(response => setCompany(response.data))
      .catch(err => console.log(err))

      fetch(`/visitorGroupID`)
      .then(response => response.json())
      .then(response => setDevID(response.data))
      .catch(err => console.log(err))
    },[]);

  function onComplete(result){
    var values =  modifySurveyResults(result);
    let data = values.resultData;
    let output_data = values.output;
    let visitor_data = values.visitor;
    var id;
    var creator_id;
    var company_code;
    console.log(JSON.stringify(output_data));
    console.log(JSON.stringify(data));
    console.log(JSON.stringify(visitor_data));
    company.forEach((item) => {
        if(item.company_name == company_name){
          company_code = item.company_code;
          creator_id = item.manager_login_id;
        }
    });
    devID.forEach((item) => {
      if(item.company_code == company_code){
        id = item.Id
      }
    });
    data.forEach((item) => {
      if(item.question_id!=1 && item.question_id!=2 && item.question_id!=3 && item.question_id!=4  && item.question_id!=5 && item.question_id!=6 && item.question_id!=7 && item.question_id!=8 && item.question_id!=9 && item.question_id!=10 && item.question_id!=11 && item.question_id!=12){
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
    visitor_data.forEach((visitor_item) => {
        var resultVisitor= JSON.stringify(visitor_item)
        var request = new XMLHttpRequest();
        request.open('POST', `/NewVisitors/${id}/${creator_id}/${company_code}`, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(resultVisitor);
    })
  }

  function onValueChanged(result) {
    /*
    for(var key in result.data) {
        var question = result.getQuestionByValueName(key);
        if(!!question) {
          if(question.name=="10"){
            setCompany_Name(question.value)
          }
        }
      }
    */
    console.log("value changed!");
  }

  var defaultThemeColors = Survey
    .StylesManager
    .ThemeColors["default"];
defaultThemeColors["$main-color"] = " #47a01a";
defaultThemeColors["$text-color"] = "#000000";
defaultThemeColors["$header-color"] = "#47a01a";

Survey
    .StylesManager
    .applyTheme();
    
  var json = {
        "title": "FirstDash Employee Wellness Survey",
        "description": "Thank you for taking the time to complete this survey. Your cooperation is appreciated!",
        showProgressBar: "bottom",
        goNextPageAutomatic: false,
        showNavigationButtons: true,
        "pages": [
            {
              name:"page1", "elements": [
                { 
                      "type": "radiogroup",
                      "name": "1",
                      "title": "Are you an employee, returning visitor or new visitor?",
                      choices: [
                        "Employee", "Returning Visitor", "New Visitor"
                      ],
                      "hideNumber": false,
                        isRequired: true,
                }
              ]
            }, 
            {
            name:"page2", visibleIf:"{1}='Employee'", "elements": [
                  { 
                        "type": "text",
                        "name": "2",
                        "title": "Your Email",
                        "inputType": "email",
                        "hideNumber": false,
                        isRequired: true,
                        placeHolder: "ex. jon.snow@nightwatch.org",
                        validators: [
                        {
                        type: "email"
                        }
                        ]
                  },
                ]
            }, {
            name:"page3", visibleIf:"{1}='Returning Visitor'", "elements": [
                  { 
                        "type": "text",
                        "name": "3",
                        "title": "Name of person you are here to see?",
                        "inputType": "text",
                        placeHolder: "ex. Jon Snow",
                        "hideNumber": false,
                        isRequired: true,
                  },
                  { 
                        "type": "text",
                        "name": "4",
                        "title": "Your Email",
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
              name:"page4", visibleIf:"{1}='New Visitor'","elements": [
                  { 
                        "type": "text",
                        "name": "5",
                        "title": "Your Name",
                        "inputType": "text",
                        "hideNumber": false,
                        placeHolder: "ex. John Doe",
                        isRequired: true,
                  },
                  { 
                        "type": "radiogroup",
                        "name": "6",
                        "title": "Sex",
                        choices: [
                          "Male", "Female"
                        ],
                        "hideNumber": false,
                          isRequired: true,
                  },
                  { 
                        "type": "text",
                        "name": "7",
                        "title": "Address of site you are visiting?",
                        "hideNumber": false,
                          isRequired: true,
                  },
                  { 
                        "type": "text",
                        "name": "8",
                        "title": "Your Email",
                        "inputType": "email",
                        "hideNumber": false,
                        isRequired: true,
                        placeHolder: "ex. jon.snow@nightwatch.org",
                        validators: [
                        {
                        type: "email"
                        }
                        ]
                  },
                  { 
                        "type": "text",
                        "name": "9",
                        "title": "Work Phone",
                        "hideNumber": false,
                          isRequired: true,
                  },
                  { 
                        "type": "dropdown",
                        "name": "10",
                        "title": "Company Name",
                        "hideNumber": false,
                        isRequired: true,
                        choicesByUrl: {
                          url: "/company_choice",
                          valueName: "company_name"
                        }
                  },
                  { 
                        "type": "text",
                        "name": "11",
                        "title": "Name of person you are here to see?",
                        "hideNumber": false,
                        placeHolder: "ex. Jon Snow",
                        isRequired: true,
                  },
                  { 
                        "type": "text",
                        "name": "12",
                        "title": "ID Card Number?",
                        "hideNumber": false,
                        isRequired: true,
                  },
                ]
            }, {
              name:"page5", "elements": [
                  {
                      "type": "radiogroup",
                      "name": "13",
                      "title": "Difficulty breathing or shortness of breath",
                      "choices": ["Yes", "No"]
                  }, 
                  {
                    "type": "radiogroup",
                    "name": "14",
                    "title": "Cough",
                    "choices": ["Yes", "No"]
                  }, {
                    "type": "radiogroup",
                    "name": "15",
                    "title": "Sore throat, trouble swallowing",
                    "choices": ["Yes", "No"]
                  }, {
                    "type": "radiogroup",
                    "name": "16",
                    "title": "Runny nose/ stuffy nose or nasal congestion",
                    "choices": ["Yes", "No"]
                  }, {
                    "type": "radiogroup",
                    "name": "17",
                    "title": "Decrease or loss of smell or taste",
                    "choices": ["Yes", "No"]
                  }, {
                    "type": "radiogroup",
                    "name": "18",
                    "title": "Nausea, vomiting, diarrhea, abdominal pain",
                    "choices": ["Yes", "No"]
                  }, {
                          "type": "radiogroup",
                          "name": "19",
                          "title": "Have you travelled outside of Canada in the past 14 days?",
                          "choices": ["Yes", "No"]
                  }, {
                          "type": "radiogroup",
                          "name": "20",
                          "title":"Have you had close contact with a confirmed or probable case of COVID-19?",
                          "choices": ["Yes", "No"]
                  }, {
                          "type": "radiogroup",
                          "name": "21",
                          "title":"I believe the answers stated in this wellness survey are true",
                          "choices": ["Yes", "No"]
                  }, {
                          "type": "html",
                          "name": "results",
                          "html": "<article class='intro'>  <h2 class='intro__heading intro__heading--income title'>Results of Screening Questions: </h2><ul><li> If the individual answers NO to all questions from 1 through 8, they passed and can enter the workplace.</li><li><p>If the individual answers YES to any questions from 1 through 8, they have not PASSED and should be advised that they should not enter the workplace (including any outdoor, or partially outdoor, workplaces). They should go home to self-isolate immediately and contact their health care provider or Telehealth Ontario (1 866-797-0000) to find out if they need a COVID-19 test.</p></li></div></article>"
                  } 
              ]
            }
        ],
        "showQuestionNumbers": "off"
    };


    function modifySurveyResults(survey) {
      var resultData = [];
      var output = [];
      var visitor = [];
      var fail = 0
      for(var key in survey.data) {
        var question = survey.getQuestionByValueName(key);
        if(!!question) {
          if(question.name=="1"){
            var status=question.value;
          }
          if(question.name=="2" || question.name=="4" || question.name=="8" ){
            var email = question.value;
          }
          if(question.name=="3" || question.name=="11" ){
            var employee_name = question.value;
          }
          if(question.name=="5"){
            var name = question.value;
          }
          if(question.name=="6" && question.value=="Male"){
            var sex = 1;
          }
          if(question.name=="6" && question.value=="Female"){
            var sex = 0;
          }
          if(question.name=="7"){
            var work_address = question.value;
          }
          if(question.name=="9"){
            var work_phone = question.value;
          }
          if(question.name=="10"){
            company_name = question.value;
          }
          if(question.name=="12"){
            var id_card_no = question.value;
          }
          if(question.name=="21" && question.value=="No"){
            fail=1
          }
          else{
            if(question.name!="21" && question.value=="Yes"){
              fail = 1
            }
            var item = { answer: question.value, question_id: question.name, email: email, time: new Date().toISOString().slice(0, 19).replace('T', ' ') };
            resultData.push(item);
          }
        }
      }
      if(status=="New Visitor"){
        var visitor_item = { name: name, email: email, sex: sex, work_address: work_address, work_phone: work_phone, company_name: company_name, id_card_no: id_card_no}
        visitor.push(visitor_item);
      }
      var employee_item = { email: email, employee_name: employee_name, date: new Date().toISOString().slice(0, 10), pass_type: fail }
      output.push(employee_item);
      return {
        resultData, 
        output,
        visitor
      };
    }

    var model = new Survey.Model(json);
    return (
      <div className="container">
        <div className="outer">
          <img className="logo" alt="Logo" src={require('./images/FirstDashLogo (Black).png')}/>
        </div>
        <Survey.Survey
          model={model}
          onComplete={onComplete}
          onValueChanged={onValueChanged}
        />
      </div>
    );
  }

  export default App;