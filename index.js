//token from the database
var token = "90931469|-31949302966626619|90960562";
        // database name
        var dbName = "Student";
        // database relation
        var relName = "Student-Rel"
        resetForm()
        // validates the from by checking if the fields are empty or not
        function validateAndGetFornData() {
            var rollnoVar = $("#rollno").val();
            // if the rollno field is empty it will give an alert
            if (rollnoVar === "") {
                alert("Roll No is required");
                $("#rollno").focus();
                return "";
            }
            // if the name field is empty it will give an alert
            var nameVar = $("#name").val();
            if (nameVar === "") {
                alert("Student Name is required");
                $("#name").focus();
                return "";
            }
            // if the class field is empty it will given an alert
            var classn = $("#class").val();
            if (classn === "") {
                alert("Class is required");
                $("#class").focus();
                return "";
            }
            // if the address field is empty it will give an alert
            var address = $("#address").val();
            if (address === "") {
                alert("address is required");
                $("#address").focus();
                return "";
            }
            // if the birthdate field is empty it will give an alert
            var BirthDate = $("#BirthDate").val();
            if (BirthDate === "") {
                alert("Birth-Date is required");
                $("#BirthDate").focus();
                return "";
            }
            // if the enrollmentdate field is empty it will give an alert
            var EnrollmentDate = $("#EnrollmentDate").val();
            if (EnrollmentDate === "") {
                alert("Enrollment-Date is required");
                $("#EnrollmentDate").focus();
                return "";
            }
            // returns jsonobject
            var jsonStrObj = {
                rollno: rollnoVar,
                name: nameVar,
                class: classn,
                address: address,
                BirthDate: BirthDate,
                EnrollmentDate: EnrollmentDate
            }

            return JSON.stringify(jsonStrObj);
        }
        // updates the values in the database it is invoke when update button is clicked
        function Updatedata() {
            var jsonStr = validateAndGetFornData();
            if (jsonStr === "") {
                return;
            }
            var putReqStr = createUPDATERecordRequest(token, jsonStr, dbName, relName, localStorage.getItem("rec_no"));
            jQuery.ajaxSetup({ async: false });
            var resultObj = executeCommandAtGivenBaseUrl(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
            if (resultObj.status == 200) {
                alert("Data updated Successfully")
            }
            else if (resultObj.status == 401) {
                alert("Invalid Token")
            }
            else if (resultObj.status == 400) {
                alert("Sorry Try again")
            }
            jQuery.ajaxSetup({ async: true });
            resetForm();
        }
        // stores the resultObj in the localstorage as rec_no
        function savetoloavelstorage(resultObj) {
            var data = JSON.parse(resultObj.data)
            localStorage.setItem('rec_no', data.rec_no)
        }
        // resets the form it is invoked when clicked on rest button
        function resetForm() {
            $("#rollno").val("");
            $("#name").val("").prop("disabled", true);
            $("#class").val("").prop("disabled", true);
            $("#address").val("").prop("disabled", true);
            $("#BirthDate").val("").prop("disabled", true);
            $("#EnrollmentDate").val("").prop("disabled", true);
            $("#rollno").prop("disabled", false)
            $("#savebutton").prop("disabled", true)
            $("#update").prop("disabled", true)
            $("#reset").prop("disabled", true)
        }
        function enableInput() {
            $("#name").prop("disabled", false);
            $("#class").prop("disabled", false);
            $("#address").prop("disabled", false);
            $("#BirthDate").prop("disabled", false);
            $("#EnrollmentDate").prop("disabled", false);
            $("#reset").prop("disabled", false)

        }
        document.getElementById("rollno").addEventListener("focusout", function (event) {
            var result=checkrecord()
        })
        function checkrecord() {
            var rollnoVar = $("#rollno").val();
            if (rollnoVar === "") {
                alert("Student Roll no is required");
                $("#name").focus();
                return "";
            }

            var jsonObj = {
                rollno: rollnoVar
            }
            var jsonStr = JSON.stringify(jsonObj);
            if (jsonStr === "") {
                return;
            }
            var getReqStr = createGET_BY_KEYRequest("90938167|-31949273008002005|90955197", "Student", "Student-Rel", jsonStr, true, true);
            jQuery.ajaxSetup({ async: false });
            var resultObj = executeCommandAtGivenBaseUrl(getReqStr, "http://api.login2explore.com:5577", "/api/irl");
            if (resultObj.status !=200) {
                $("#savebutton").prop("disabled", false)
                enableInput()
            }
            else{
                $("#savebutton").prop("disabled", true)
                fillData(resultObj)
                return true;
            }
        }
        // If the enetered roll no is already present in the database 
        // it fills the existing values in the field
        function fillData(resultObj) {
            var data = JSON.parse(resultObj.data);
            var data1 = JSON.stringify(data.record)
            var data2 = JSON.parse(data1)
            $("#rollno").val(data2.rollno);
            $("#name").val(data2.name);

            $("#class").val(data2.class);
            $("#address").val(data2.address);
            $("#BirthDate").val(data2.BirthDate);
            $("#EnrollmentDate").val(data2.EnrollmentDate);
            jQuery.ajaxSetup({ async: true });
            savetoloavelstorage(resultObj)
            $("#rollno").prop("disabled", true)
            $("#savebutton").prop("disabled", true)
            $("#rollno").prop("disabled", true)
            $("#update").prop("disabled", false)

            enableInput()
        }

        // when the Save button is clicked this function will invoke and 
        //save the entered values to the database
        function Savedata() {
            var jsonStr = validateAndGetFornData();
            if (jsonStr === "") {
                return;
            }
            var putReqStr = createPUTRequest(token, jsonStr, dbName, relName);
            jQuery.ajaxSetup({ async: false });
            var resultObj = executeCommandAtGivenBaseUrl(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
            if (resultObj.status == 200) {
                alert("Data added Successfully")
            }
            else if (resultObj.status == 401) {
                alert("Invalid Token")
            }
            else if (resultObj.status == 400) {
                alert("Sorry Try again")
            }
            jQuery.ajaxSetup({ async: true });
            resetForm();
        }
