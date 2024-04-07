import React, { useState, useEffect } from 'react';
import Date_Picker from '../components/Date_Picker';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ParentsInfo({  //------------------1------------------
    sendFatherEmailToEnroll,
    sendisFatherRecordDataToEnroll,
    sendFatherFirstnameToEnroll,
    sendFatherLastnameToEnroll,
    sendFatherDateOfBirthToEnroll,
    sendisFatherForeignerToEnroll,
    sendFatherNationalityToEnroll,
    sendFatherOccupationToEnroll,
    sendFatherOfficeToEnroll,
    sendFatherTelToEnroll,

    sendMotherEmailToEnroll,
    sendisMotherRecordDataToEnroll,
    sendMotherFirstnameToEnroll,
    sendMotherLastnameToEnroll,
    sendMotherDateOfBirthToEnroll,
    sendisMotherForeignerToEnroll,
    sendMotherNationalityToEnroll,
    sendMotherOccupationToEnroll,
    sendMotherOfficeToEnroll,
    sendMotherTelToEnroll,

    sendParentEmailToEnroll,
    sendisParentRecordDataToEnroll,
    sendParentFirstnameToEnroll,
    sendParentLastnameToEnroll,
    sendParentDateOfBirthToEnroll,
    sendisParentForeignerToEnroll,
    sendParentNationalityToEnroll,
    sendParentOccupationToEnroll,
    sendParentOfficeToEnroll,
    sendParentTelToEnroll,
    sendParentRoleToEnroll,
    sendwhoAreParentToEnroll
    }) {
        const apiUrl = process.env.API_URL
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // const [age, setAge] = useState(''); 
    const [selectedOption, setSelectedOption] = useState('ระบุหมายเหตุ');

    const [isFatherRecordData, setIsFatherRecordData] = useState(false);
    const [FatherFirstname, setFatherFirstname] = useState('');
    const [FatherLastname, setFatherLastname] = useState('');
    const [FatherDateOfBirth, setFatherDateOfBirth] = useState('');
    const [isFatherForeigner, setIsFatherForeigner] = useState(false); // State สำหรับเก็บข้อมูลว่าเป็นคนต่างชาติหรือไม่
    const [FatherNationality, setFatherNationality] = useState(''); // State สำหรับเก็บข้อมูลสัญชาติ
    const [FatherOccupation, setFatherOccupation] = useState('');
    const [FatherOffice, setFatherOffice] = useState('');
    const [FatherTel, setFatherTel] = useState('');
    const [FatherRole, setFatherRole] = useState('');
  
    const [isMotherRecordData, setIsMotherRecordData] = useState(false);
    const [MotherFirstname, setMotherFirstname] = useState('');
    const [MotherLastname, setMotherLastname] = useState('');
    const [MotherDateOfBirth, setMotherDateOfBirth] = useState('');
    const [isMotherForeigner, setIsMotherForeigner] = useState(false); // State สำหรับเก็บข้อมูลว่าเป็นคนต่างชาติหรือไม่
    const [MotherNationality, setMotherNationality] = useState(''); // State สำหรับเก็บข้อมูลสัญชาติ
    const [MotherOccupation, setMotherOccupation] = useState('');
    const [MotherOffice, setMotherOffice] = useState('');
    const [MotherTel, setMotherTel] = useState('');
    const [MotherRole, setMotherRole] = useState('');
  
    const [isParentRecordData, setIsParentRecordData] = useState(false);
    const [ParentFirstname, setParentFirstname] = useState('');
    const [ParentLastname, setParentLastname] = useState('');
    const [ParentDateOfBirth, setParentDateOfBirth] = useState('');
    const [isParentForeigner, setIsParentForeigner] = useState(false); // State สำหรับเก็บข้อมูลว่าเป็นคนต่างชาติหรือไม่
    const [ParentNationality, setParentNationality] = useState(''); // State สำหรับเก็บข้อมูลสัญชาติ
    const [ParentOccupation, setParentOccupation] = useState('');
    const [ParentOffice, setParentOffice] = useState('');
    const [ParentTel, setParentTel] = useState('');
    const [ParentRole, setParentRole] = useState('');


    const [FoundFather, setFoundFather] = useState(true);
    const [FoundMother, setFoundMother] = useState(true);
    const [FoundParent, setFoundParent] = useState(true);

    const [FatherEmail, setFatherEmail] = useState('');
    const [MotherEmail, setMotherEmail] = useState('');
    const [ParentEmail, setParentEmail] = useState('');

    const [whoAreParent, setwhoAreParent] = useState(false);

    const handleFatherDateOfBirthChange = (date) => {
        // ใช้ date-fns เพื่อแปลงวันที่ให้เป็นรูปแบบ 'วัน/เดือน/ปี'
        // const formattedDate = format(date, 'dd/MM/yyyy');
        if(FatherDateOfBirth === ''){
            setFatherDateOfBirth(date);
        }
        // if (!isFatherRecordData) { // ตรวจสอบว่าสามารถแก้ไขได้หรือไม่
        //     setFatherDateOfBirth(date); // อัปเดตค่าเฉพาะเมื่อสามารถแก้ไขได้
        // }

        // ใช้ date-fns เพื่อแปลงวันที่ให้เป็นรูปแบบ 'ปี-เดือน-วัน'
        // const formattedDate = format(date, 'yyyy-MM-dd');
        console.log("FatherDateOfBirth--------------:", date);
    };

    const handlMotherDateOfBirthChange = (date) => {
        // const formattedDate = format(date, 'yyyy-MM-dd');
        setMotherDateOfBirth(date);
        // console.log("MotherDateOfBirth", formattedDate);
    };

    const handlParentDateOfBirthChange = (date) => {
        // const formattedDate = format(date, 'yyyy-MM-dd');
        setParentDateOfBirth(date);
        // console.log("MotherDateOfBirth", formattedDate);
    };

    //Father data useEffect-------------------------------------------
    useEffect(() => {
        setFoundFather(checkFather_Email(FatherEmail));
        if (!isFatherRecordData){
            sendFatherEmailToEnroll(FatherEmail);
            sendisFatherRecordDataToEnroll(isFatherRecordData);
        }
        
    // }, [isFatherRecordData, FatherEmail, sendisFatherRecordDataToEnroll, sendFatherEmailToEnroll]); 
    }, [FatherEmail, sendFatherEmailToEnroll]); 

    useEffect(() => {
        if (!isFatherRecordData){
            sendFatherFirstnameToEnroll(FatherFirstname);
        }
        
    // }, [isFatherRecordData, FatherFirstname, sendFatherEmailToEnroll, sendFatherFirstnameToEnroll]);
    }, [FatherFirstname, sendFatherFirstnameToEnroll]);

    useEffect(() => {
        if (!isFatherRecordData){
            sendFatherLastnameToEnroll(FatherLastname);
        }
    }, [FatherLastname, sendFatherLastnameToEnroll]);

    useEffect(() => {
        if (!isFatherRecordData){
            sendFatherDateOfBirthToEnroll(FatherDateOfBirth);
        }
    }, [FatherDateOfBirth, sendFatherDateOfBirthToEnroll]);

    useEffect(() => {
        // if (!isFatherRecordData){
            sendisFatherForeignerToEnroll(isFatherForeigner);
        // }
    }, [isFatherForeigner, sendisFatherForeignerToEnroll]);

    useEffect(() => {
        if (!isFatherRecordData){
            sendFatherNationalityToEnroll(FatherNationality);
        }
    }, [FatherNationality, sendFatherNationalityToEnroll]);

    useEffect(() => {
        if (!isFatherRecordData){
            sendFatherOccupationToEnroll(FatherOccupation);
        }
    }, [FatherOccupation, sendFatherOccupationToEnroll]);

    useEffect(() => {
        if (!isFatherRecordData){
            sendFatherOfficeToEnroll(FatherOffice);
        }
    }, [FatherOffice, sendFatherOfficeToEnroll]);

    useEffect(() => {
        if (!isFatherRecordData){
            sendFatherTelToEnroll(FatherTel);
        }
    }, [FatherTel, sendFatherTelToEnroll]);

    //Mother data useEffect-------------------------------------------
    useEffect(() => {
        setFoundMother(checkMother_Email(MotherEmail));
        if (!isMotherRecordData){
            sendMotherEmailToEnroll(MotherEmail);
            sendisMotherRecordDataToEnroll(isMotherRecordData);
        }
    }, [MotherEmail, sendMotherEmailToEnroll]); 

    useEffect(() => {
        if (!isMotherRecordData){
            sendMotherFirstnameToEnroll(MotherFirstname);
        }
    }, [MotherFirstname, sendMotherFirstnameToEnroll]);

    useEffect(() => {
        if (!isMotherRecordData){
            sendMotherLastnameToEnroll(MotherLastname);
        }
    }, [MotherLastname, sendMotherLastnameToEnroll]);

    useEffect(() => {
        if (!isMotherRecordData){
            sendMotherDateOfBirthToEnroll(MotherDateOfBirth);
        }
    }, [MotherDateOfBirth, sendMotherDateOfBirthToEnroll]);

    useEffect(() => {
        // if (!isMotherRecordData){
            sendisMotherForeignerToEnroll(isMotherForeigner);
        // }
    }, [isMotherForeigner, sendisMotherForeignerToEnroll]);

    useEffect(() => {
        if (!isMotherRecordData){
            sendMotherNationalityToEnroll(MotherNationality);
        }
    }, [MotherNationality, sendMotherNationalityToEnroll]);

    useEffect(() => {
        if (!isMotherRecordData){
            sendMotherOccupationToEnroll(MotherOccupation);
        }
    }, [MotherOccupation, sendMotherOccupationToEnroll]);

    useEffect(() => {
        if (!isMotherRecordData){
            sendMotherOfficeToEnroll(MotherOffice);
        }
    }, [MotherOffice, sendMotherOfficeToEnroll]);

    useEffect(() => {
        if (!isMotherRecordData){
            sendMotherTelToEnroll(MotherTel);
        }
    }, [MotherTel, sendMotherTelToEnroll]);

    //Parent data useEffect-------------------------------------------
    useEffect(() => {
        setFoundParent(checkParent_Email(ParentEmail));
        if (!isParentRecordData){
            sendParentEmailToEnroll(ParentEmail);
            sendisParentRecordDataToEnroll(isParentRecordData);
        }
    }, [ParentEmail, sendParentEmailToEnroll]); 

    useEffect(() => {
        if (!isParentRecordData){
            sendParentFirstnameToEnroll(ParentFirstname);
        }
    }, [ParentFirstname, sendParentFirstnameToEnroll]);

    useEffect(() => {
        if (!isParentRecordData){
            sendParentLastnameToEnroll(ParentLastname);
        }
    }, [ParentLastname, sendParentLastnameToEnroll]);

    useEffect(() => {
        if (!isParentRecordData){
            sendParentDateOfBirthToEnroll(ParentDateOfBirth);
        }
    }, [ParentDateOfBirth, sendParentDateOfBirthToEnroll]);

    useEffect(() => {
        // if (!isParentRecordData){
            sendisParentForeignerToEnroll(isParentForeigner);
        // }
    }, [isParentForeigner, sendisParentForeignerToEnroll]);

    useEffect(() => {
        if (!isParentRecordData){
            sendParentNationalityToEnroll(ParentNationality);
        }
    }, [ParentNationality, sendParentNationalityToEnroll]);

    useEffect(() => {
        if (!isParentRecordData){
            sendParentOccupationToEnroll(ParentOccupation);
        }
    }, [ParentOccupation, sendParentOccupationToEnroll]);

    useEffect(() => {
        if (!isParentRecordData){
            sendParentOfficeToEnroll(ParentOffice);
        }
    }, [ParentOffice, sendParentOfficeToEnroll]);

    useEffect(() => {
        if (!isParentRecordData){
            sendParentTelToEnroll(ParentTel);
        }
    }, [ParentTel, sendParentTelToEnroll]);

    useEffect(() => {
        if (!isParentRecordData){
            sendParentRoleToEnroll(ParentRole);
        }
    }, [ParentRole, sendParentRoleToEnroll]);

    useEffect(() => {
        // if (!isParentRecordData){
            sendwhoAreParentToEnroll(whoAreParent);
        // }
    }, [whoAreParent, sendwhoAreParentToEnroll]);



    const handleFatherEmailChange = (event) => {
        setFatherEmail(event.target.value);
    };

    useEffect(() => {
        if (isMotherRecordData) {
            // if (MotherEmail !== '') {
                sendMotherEmailToEnroll(MotherEmail);
            // }
            sendisMotherRecordDataToEnroll(isMotherRecordData);
        }
    }, [isMotherRecordData, MotherEmail, sendisMotherRecordDataToEnroll, sendMotherEmailToEnroll]); 
    
    const handleMotherEmailChange = (event) => {
        setMotherEmail(event.target.value);
    };

    useEffect(() => {
        if (isParentRecordData) {
            // if (ParentEmail !== '') {
            sendParentEmailToEnroll(ParentEmail);
            // }
            sendisParentRecordDataToEnroll(isParentRecordData);
        }
    }, [isParentRecordData, ParentEmail, sendisParentRecordDataToEnroll, sendParentEmailToEnroll]);
    
    const handleParentEmailChange = (event) => {
            setParentEmail(event.target.value);
        };
    
    useEffect(() => {
        if (FatherDateOfBirth !== new Date()) {
            // sendFatherDateOfBirthToEnroll(FatherDateOfBirth);
            console.log("FatherDateOfBirth", FatherDateOfBirth);
        } 
        // else {
        //     const formattedDate = format(new Date(), 'yyyy-MM-dd'); // ใช้ new Date() เพื่อเรียกใช้งานวันที่ปัจจุบัน
            // setFatherDateOfBirth(formattedDate);
        //     console.log("FatherDateOfBirth2222", FatherDateOfBirth);
        // }
    // }, [FatherDateOfBirth, sendFatherDateOfBirthToEnroll]);
    }, [isFatherRecordData, FatherDateOfBirth]);

    useEffect(() => {
        if (MotherDateOfBirth !== new Date()) {
            // console.log("MotherDateOfBirth", MotherDateOfBirth);
        } 
    }, [isMotherRecordData, MotherDateOfBirth]);

    useEffect(() => {
        if (ParentDateOfBirth !== new Date()) {
            // console.log("ParentDateOfBirth", ParentDateOfBirth);
        } 
    }, [isParentRecordData, ParentDateOfBirth]);
    
    
    //handle Father data change--------------------------
    const handleFatherFirstnameChange = (event) => {
        setFatherFirstname(event.target.value);
    };

    const handleFatherLastnameChange = (event) => {
        setFatherLastname(event.target.value);
    };

    const handleIsFatherForeigner = (event) => {
        setIsFatherForeigner(event.target.id === 'FatherForeigner'); // ถ้าเลือก 'ใช่' ให้เป็น true, ถ้า 'ไม่' ให้เป็น false
    }; 

    const handleFatherNationalityChange = (event) => {
        setFatherNationality(event.target.value);
        // console.log("FatherNationality",FatherNationality);
    };

    const handleFatherOccupationChange = (event) => {
        setFatherOccupation(event.target.value);
    }

    const handleFatherOfficeChange = (event) => {
        setFatherOffice(event.target.value);
    }
    
    const handleFatherTelChange = (event) => {
        setFatherTel(event.target.value);
    }

    //handle Mother data change--------------------------
    const handleMotherFirstnameChange = (event) => {
        setMotherFirstname(event.target.value);
    };

    const handleMotherLastnameChange = (event) => {
        setMotherLastname(event.target.value);
    };

    const handleIsMotherForeigner = (event) => {
        setIsMotherForeigner(event.target.id === 'MotherForeigner');
    }; 

    const handleMotherNationalityChange = (event) => {
        setMotherNationality(event.target.value);
    };

    const handleMotherOccupationChange = (event) => {
        setMotherOccupation(event.target.value);
    }

    const handleMotherOfficeChange = (event) => {
        setMotherOffice(event.target.value);
    }
    
    const handleMotherTelChange = (event) => {
        setMotherTel(event.target.value);
    }

    //handle Parent data change--------------------------
    const handleParentFirstnameChange = (event) => {
        setParentFirstname(event.target.value);
    };

    const handleParentLastnameChange = (event) => {
        setParentLastname(event.target.value);
    };

    const handleIsParentForeigner = (event) => {
        setIsParentForeigner(event.target.id === 'ParentForeigner');
    }; 

    const handleParentNationalityChange = (event) => {
        setParentNationality(event.target.value);
    };

    const handleParentOccupationChange = (event) => {
        setParentOccupation(event.target.value);
    }

    const handleParentOfficeChange = (event) => {
        setParentOffice(event.target.value);
    }
    
    const handleParentTelChange = (event) => {
        setParentTel(event.target.value);
    }

    const handleParentRoleChange = (event) => {
        setParentRole(event.target.value);
    }
    
    // const handleIsFatherRecordData = (event) => {
    //     setIsFatherRecordData(event.target.id === 'usedToRecordFatherData'); // ถ้าเลือก 'ใช่' ให้เป็น true, ถ้า 'ไม่' ให้เป็น false
    // }; 

    // const handleFatherNotRecordData = (event) => {
    //     setFatherNotRecordData(event.target.id === 'notYetRecordFatherData'); // ถ้าเลือก 'ใช่' ให้เป็น true, ถ้า 'ไม่' ให้เป็น false
    // }; 

    // const handleIsMotherRecordData = (event) => {
    //     setIsMotherRecordData(event.target.id === 'usedToRecordMotherData'); // ถ้าเลือก 'ใช่' ให้เป็น true, ถ้า 'ไม่' ให้เป็น false
    //     if (isMotherRecordData){
    //         setIsMotherForeigner(false);
    //     }
    //     else{
    //         setMotherEmail('');
    //     }
    // }; 

    // const handleIsParentRecordData = (event) => {
    //     setIsParentRecordData(event.target.id === 'usedToRecordParentData'); // ถ้าเลือก 'ใช่' ให้เป็น true, ถ้า 'ไม่' ให้เป็น false
    //     if (isParentRecordData){
    //         setIsParentForeigner(false);
    //     }
    //     else{
    //         setParentEmail('');
    //     }
    // }; 

    const handlewhoAreParent = (event) => {
        setwhoAreParent(event.target.id);
        // setwhoAreParent(true);
        if (event.target.id === "FatherIsParent" || event.target.id === "MotherIsParent" || event.target.id === "FatherAndMotherAreParent"){
            setIsParentRecordData(true);
            console.log('okokokokok',event.target.id);
        }
    };

    useEffect(() => {
        if (isFatherForeigner) {
            if (FatherNationality !== '') {
                // sendFatherNationalityToEnroll(FatherNationality);
            }
            sendisFatherRecordDataToEnroll(isFatherForeigner);
        }
    // }, [isFatherRecordData, FatherEmail, sendFatherNationalityToEnroll]); 
    }, [isFatherForeigner, FatherEmail]); 

    useEffect(() => {
        // if (isMotherForeigner) {
        //     if (MotherNationality !== '') {
                // sendMotherNationalityToEnroll(MotherNationality);
            // }
            sendisMotherForeignerToEnroll(isMotherForeigner);
        // }
    // }, [isMotherForeigner, MotherNationality, sendMotherNationalityToEnroll]); 
    }, [isMotherForeigner, MotherNationality]); 

    useEffect(() => {
        // if (isParentForeigner) {
        //     if (ParentNationality !== '') {
                // sendParentNationalityToEnroll(ParentNationality);
            // }
            sendisParentForeignerToEnroll(isParentForeigner);
        // }
    // }, [isParentForeigner, ParentNationality, sendParentNationalityToEnroll]);
    }, [isParentForeigner, ParentNationality]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Perform form submission logic here, e.g., send data to server via API call
    //     console.log('Form submitted:', { firstName, lastName, age });
    // };

    // const handleSelectChange = (event) => {
    //     setSelectedOption(event.target.value);
    // };

    const checkFather_Email = async (email) => {
        try {
            const response = await axios.get(apiUrl + `/check-email?email=${email}`);
            const data = response.data;

            if (data.results) {
                console.log("data.results",data.results);
                setFatherFirstname(data.results[0].FirstName);
                setFatherLastname(data.results[0].LastName);

                // กำหนดวันที่ในรูปแบบ 'YYYY-MM-DD'
                const dateString = data.results[0].DateOfBirth;

                // แปลงวันที่ในรูปแบบ 'YYYY-MM-DD' เป็นวันที่ใน JavaScript
                const date = new Date(dateString);
                

                // รูปแบบวันที่ใน JavaScript โดยใช้วิธี toLocaleDateString()
                const formattedDate = date.toLocaleDateString();

                setFatherDateOfBirth(date);
                // handleFatherDateOfBirthChange(date);

                setFatherNationality(data.results[0].Nationality);
                setIsFatherRecordData(true);
                setFatherOccupation(data.results[0].Occupation);
                setFatherOffice(data.results[0].Office);
                setFatherTel(data.results[0].Tel);

                return true;
            } 
            else {
                if (isFatherRecordData){
                    setFatherFirstname('');
                    setFatherLastname('');
                    setFatherDateOfBirth(new Date());
                    setFatherNationality('');
                    setFatherOccupation('');
                    setFatherOffice('');
                    setFatherTel('');
                }

                setIsFatherRecordData(false);
                return false;
            }
        } catch (error) {
            console.error('Error checking email:', error);
            alert('An error occurred while checking email.');
        }
    };

    const checkMother_Email = async (email) => {
        try {
            const response = await axios.get(apiUrl + `/check-email?email=${email}`);
            const data = response.data;

            if (data.results) {
                console.log("data.results",data.results);
                setMotherFirstname(data.results[0].FirstName);
                setMotherLastname(data.results[0].LastName);

                // กำหนดวันที่ในรูปแบบ 'YYYY-MM-DD'
                const dateString = data.results[0].DateOfBirth;

                // แปลงวันที่ในรูปแบบ 'YYYY-MM-DD' เป็นวันที่ใน JavaScript
                const date = new Date(dateString);

                // รูปแบบวันที่ใน JavaScript โดยใช้วิธี toLocaleDateString()
                const formattedDate = date.toLocaleDateString();

                setMotherDateOfBirth(date);
                setMotherNationality(data.results[0].Nationality);
                setIsMotherRecordData(true);
                setMotherOccupation(data.results[0].Occupation);
                setMotherOffice(data.results[0].Office);
                setMotherTel(data.results[0].Tel);

                return true;
            } 
            else {
                if (isMotherRecordData){
                    setMotherFirstname('');
                    setMotherLastname('');
                    setMotherDateOfBirth('');
                    setMotherNationality('');
                    setMotherOccupation('');
                    setMotherOffice('');
                    setMotherTel('');
                }

                setIsMotherRecordData(false);
                return false;
            }
        } catch (error) {
            console.error('Error checking Mother email:', error);
            alert('An error occurred while checking Mother email.');
        }
    };

    const checkParent_Email = async (email) => {
        try {
            const response = await axios.get(apiUrl + `/check-email?email=${email}`);
            const data = response.data;

            if (data.results) {
                console.log("data.results",data.results);
                setParentFirstname(data.results[0].FirstName);
                setParentLastname(data.results[0].LastName);

                // กำหนดวันที่ในรูปแบบ 'YYYY-MM-DD'
                const dateString = data.results[0].DateOfBirth;

                // แปลงวันที่ในรูปแบบ 'YYYY-MM-DD' เป็นวันที่ใน JavaScript
                const date = new Date(dateString);

                // รูปแบบวันที่ใน JavaScript โดยใช้วิธี toLocaleDateString()
                const formattedDate = date.toLocaleDateString();

                setParentDateOfBirth(date);

                setParentNationality(data.results[0].Nationality);
                setIsParentRecordData(true);
                setParentOccupation(data.results[0].Occupation);
                setParentOffice(data.results[0].Office);
                setParentTel(data.results[0].Tel);

                return true;
            } 
            else {
                if (isParentRecordData){
                    setParentFirstname('');
                    setParentLastname('');
                    setParentDateOfBirth('');
                    setParentNationality('');
                    setParentOccupation('');
                    setParentOffice('');
                    setParentTel('');
                }

                setIsParentRecordData(false);
                return false;
            }
        } catch (error) {
            console.error('Error checking email:', error);
            alert('An error occurred while checking email.');
        }
    };
    

  <ParentsInfo 
    sendFatherEmailToEnroll={sendFatherEmailToEnroll} 
    sendisFatherRecordDataToEnroll={sendisFatherRecordDataToEnroll}
    sendFatherFirstnameToEnroll={sendFatherFirstnameToEnroll}
    sendFatherLastnameToEnroll={sendFatherLastnameToEnroll}
    sendFatherDateOfBirthToEnroll={sendFatherDateOfBirthToEnroll}
    sendisFatherForeignerToEnroll={sendisFatherForeignerToEnroll}
    sendFatherNationalityToEnroll={sendFatherNationalityToEnroll}
    sendFatherOccupationToEnroll={sendFatherOccupationToEnroll}
    sendFatherOfficeToEnroll={sendFatherOfficeToEnroll}
    sendFatherTelToEnroll={sendFatherTelToEnroll}

    sendMotherEmailToEnroll={sendMotherEmailToEnroll} 
    sendisMotherRecordDataToEnroll={sendisMotherRecordDataToEnroll}
    sendMotherFirstnameToEnroll={sendMotherFirstnameToEnroll}
    sendMotherLastnameToEnroll={sendMotherLastnameToEnroll}
    sendMotherDateOfBirthToEnroll={sendMotherDateOfBirthToEnroll}
    sendisMotherForeignerToEnroll={sendisMotherForeignerToEnroll}
    sendMotherNationalityToEnroll={sendMotherNationalityToEnroll}
    sendMotherOccupationToEnroll={sendMotherOccupationToEnroll}
    sendMotherOfficeToEnroll={sendMotherOfficeToEnroll}
    sendMotherTelToEnroll={sendMotherTelToEnroll}

    sendParentEmailToEnroll={sendParentEmailToEnroll}
    sendisParentRecordDataToEnroll={sendisParentRecordDataToEnroll}
    sendParentFirstnameToEnroll={sendParentFirstnameToEnroll}
    sendParentLastnameToEnroll={sendParentLastnameToEnroll}
    sendParentDateOfBirthToEnroll={sendParentDateOfBirthToEnroll}
    sendisParentForeignerToEnroll={sendisParentForeignerToEnroll}
    sendParentNationalityToEnroll={sendParentNationalityToEnroll}
    sendParentOccupationToEnroll={sendParentOccupationToEnroll}
    sendParentOfficeToEnroll={sendParentOfficeToEnroll}
    sendParentTelToEnroll={sendParentTelToEnroll}
    sendParentRoleToEnroll={sendParentRoleToEnroll}
    sendwhoAreParentToEnroll={sendwhoAreParentToEnroll}
    />

  return (
    <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif'}}>
        <div className="row" style={{fontWeight: 'bold', fontSize: '20px', marginRight: '5px', gap: '0',Height: '100vh'}}>
            <div className="col-sm d-flex align-items-center">
                    <label htmlFor="father_data" className="col-form-label">ข้อมูลบิดา</label>
                </div>
        </div>
            {/* <br /> */}
        {/* <h2 className="col-sm d-flex align-items-center" style={{marginLeft: '15px',fontSize: '18px'}}>เคยบันทึกข้อมูลบิดาแล้วหรือไม่</h2> */}
        {/* <h2 className="card-heading mb-0 mx-3" style={{ fontSize: '16px', color: 'red' ,marginTop:"5px"}}>
            **เลือก ใช่ กรณีเคยบันทึกข้อมูลของตนสำหรับใช้สมัครเรียนให้บุตรหลานของท่าน
        </h2> */}

        {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '16px',marginLeft: '15px' ,marginTop:"5px"}}>
            <div className="form-check" style={{ marginTop: '10px',maxWidth:"100%"}}>
                <input className="form-check-input" type="radio" name="usedToRecordFatherData?" id="usedToRecordFatherData" value="ใช่" onChange={handleIsFatherRecordData} />
                <label className="form-check-label custom-body" style={{ fontSize: '16px',marginRight: '10px' }} htmlFor="usedToRecordFatherData">
                ใช่
                </label>
            </div>
            <div className="form-check" style={{ marginTop: '10px',maxWidth:"100%"}}>
                <input className="form-check-input" type="radio" name="usedToRecordFatherData?" id="notYetRecordFatherData" value="ไม่ใช่" onChange={handleIsFatherRecordData} />
                <label className="form-check-label custom-body" style={{ fontSize: '16px',marginRight: '10px' }} htmlFor="notYetRecordFatherData">
                ไม่ใช่
                </label>
            </div>
        </div> */}

        {/* {!isFatherRecordData ? (
            <> */}
                <div style={{fontSize: '18px',marginTop:"5px"}}>
                    <div className="d-flex align-items-center"style={{flexWrap:"wrap"}}>
                        <label htmlFor="Father_Email" className="col-form-label mb-0 mx-3">อีเมล</label>
                    {/* </div>   
                    <div className="d-flex align-items-center">   */}
                        <h2 className="card-heading mb-0 mx-3" style={{ fontSize: '16px', color: 'blue' }}>
                        (อีเมลที่ท่านกรอกนี้สามารถใช้ตรวจสอบข้อมูลนักเรียนของโรงเรียนซึ่งเป็นบุตรหลานของท่าน)
                    </h2>
                    </div>
                
                    <div className="align-items-center"style={{ marginTop: '5px',maxWidth:"65%"}}> 
                        <input type="text" className="form-control mb-0 mx-3" id="Father_Email" name="Father_Email" value={FatherEmail} placeholder="กรอกอีเมลบิดา" onChange={handleFatherEmailChange}/>
                    </div>
                </div>
            {/* </>
        ) : (
            <> */}
            <br />

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '18px',marginLeft: '15px' , marginTop: '0px',maxWidth:"100%"}}>

                    <div className="d-flex align-items-center" >
                        <label htmlFor="father_Firstname" className="col-form-label">ชื่อ</label>
                    </div>

                    <div className="align-items-center" style={{ maxWidth: "100%" }}>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="father_Firstname" 
                            name="father_Firstname" 
                            placeholder="กรอกชื่อ" 
                            value={FatherFirstname} 
                            onChange={handleFatherFirstnameChange} 
                            readOnly={isFatherRecordData} // กำหนด prop readOnly ตามค่าของ isFatherRecordData
                            // required
                        />
                    </div>

                    <div className="align-items-center">
                        <label htmlFor="father_lastname" className="col-form-label">นามสกุล</label>
                    </div>

                    <div className="align-items-center" style={{maxWidth:"100%"}}>
                        <input
                            type="text"
                            className="form-control"
                            id="father_lastname"
                            name="father_lastname"
                            placeholder="กรอกนามสกุล"
                            value={FatherLastname}
                            onChange={handleFatherLastnameChange}
                            readOnly={isFatherRecordData}/>
                    </div>

                    <div className="align-items-center">
                        <label htmlFor="father_dob" className="col-form-label">วัน/เดือน/ปีเกิด</label>
                    </div>

                    <div className="align-items-center" style={{ marginLeft: '15px' }}>
                        <Date_Picker value={FatherDateOfBirth} onChange={handleFatherDateOfBirthChange} readOnly={isFatherRecordData}/>
                    </div>

                    {/* <div className="d-flex align-items-center" style={{maxWidth:"100%"}}>
                        <input type="text" className="form-control" id="father_dob" name="father_dob" placeholder="กรอกอายุบิดา" />
                        <label htmlFor="year" className="col-form-label"style={{marginLeft: '15px'}}>ปี</label>
                    </div> */}
                </div>

               

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '18px',marginLeft: '15px' }}>

                    <h2 className="col-form-label" style={{ marginTop: '5px', fontFamily: 'Kanit, sans-serif', fontSize: '18px'}}>เป็นคนต่างชาติใช่หรือไม่</h2>
                    <div className="d-flex align-items-center"style={{ flexWrap: 'wrap'}} >
                        <div className="form-check" style={{ marginTop: '5px',maxWidth:"100%"}}>
                            <input className="form-check-input" type="radio" name="Fatherforeigner?" id="FatherForeigner" value={isFatherForeigner} onChange={handleIsFatherForeigner} />
                            <label className="form-check-label custom-body"style={{ fontSize: '16px',marginRight: '10px' }} htmlFor="FatherForeigner">
                            ใช่
                            </label>
                        </div>
                        <div className="form-check" style={{ marginTop: '5px',maxWidth:"100%"}}>
                            <input className="form-check-input" type="radio" name="Fatherforeigner?" id="FatherNotForeigner" value={isFatherForeigner} onChange={handleIsFatherForeigner} />
                            <label className="form-check-label custom-body" style={{ fontSize: '16px',marginRight: '10px' }} htmlFor="FatherNotForeigner">
                            ไม่
                            </label>
                        </div>
                    </div>
                {/* </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', whiteSpace: 'nowrap', fontSize: '18px',marginLeft: '15px' }}> */}
                    {/* ใช้เงื่อนไขเพื่อตรวจสอบว่าถ้าเป็นคนต่างชาติให้แสดงส่วนของสัญชาติ */}
                    {isFatherForeigner && (
                        <>
                        <div className="d-flex align-items-center" style={{ marginTop: '5px',maxWidth:"100%"}}>
                            <label htmlFor="father_Nationality" className="col-form-label">สัญชาติ</label>
                        </div>
                        <div className="align-items-center" style={{marginTop: '5px',maxWidth:"100%"}}>
                            <input type="text" className="form-control" id="father_Nationality" name="father_Nationality" placeholder="กรอกสัญชาติ" value={FatherNationality} onChange={handleFatherNationalityChange}/>
                        </div>
                        </>
                    )}
                </div>
                

                {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '18px',marginLeft: '15px' }}>
                
                        <div className="d-flex align-items-center" style={{ marginTop: '10px',maxWidth:"100%"}}>
                            <label htmlFor="father_Occupation" className="col-form-label">วุฒิการศึกษา</label>
                        </div>
                        <div class="h-screen flex flex-col justify-left sm:flex-row">
                        <div class="sm:w-1_3 sm:pr-3">
                            <div class="dropdown" style={{ marginTop: '10px', maxWidth: '100%' }}> 
                                <select value={selectedOption} onChange={handleSelectChange} class="custom-select w-full" > 
                                    <option value="ระบุหมายเหตุ">ระบุวุฒิการศึกษา</option>
                                    <option value="เพื่อใช้ในการขอทุนการศึกษา">ปริญญาตรี</option>
                                    <option value="เพื่อใช้ในการสมัครเข้าศึกษาต่อ">ปริญญาโท</option>
                                    <option value="เพื่อใช้ในการสมัครเข้าศึกษาต่อ">ปริญญาเอก</option>
                                </select>
                            </div>
                        </div>
                        </div>
                        
                </div> */}
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '18px',marginLeft: '15px' }}>
                        <div className="d-flex align-items-center" style={{ marginTop: '5px',maxWidth:"100%"}}>
                            <label htmlFor="father_Occupation" className="col-form-label">อาชีพ</label>
                        </div>
                        <div className="align-items-center" style={{ marginTop: '5px',maxWidth:"100%"}}>       
                            <input type="text" className="form-control" id="father_Occupation" name="father_Occupation" value={FatherOccupation} placeholder="กรอกอาชีพ" onChange={handleFatherOccupationChange}/>
                        </div>
                        <div className="d-flex align-items-center" style={{ marginTop: '5px',maxWidth:"100%"}}>
                            <label htmlFor="father_Workplace" className="col-form-label">สถานที่ทำงาน</label>
                        </div>
                        <div className="align-items-center" style={{ marginTop: '5px',maxWidth:"100%"}}>   
                            <input type="text" className="form-control" id="father_Workplace" name="father_Workplace" value={FatherOffice} placeholder="กรอกสถานที่ทำงาน" onChange={handleFatherOfficeChange}/>
                        </div>
                        <div className="d-flex align-items-center" style={{ marginTop: '5px',maxWidth:"100%"}}>
                            <label htmlFor="father_phoneNumber" className="col-form-label">โทรศัพท์</label>
                            </div>
                        <div className="align-items-center" style={{ marginTop: '5px',maxWidth:"100%"}}>   
                            <input type="text" className="form-control" id="father_phoneNumber" name="father_phoneNumber" value={FatherTel} placeholder="กรอกหมายเลขโทรศัพท์" onChange={handleFatherTelChange}/>
                        </div>
                        
                        
                </div>
            {/* </>
        )} */}






        <br />
        <div className="row" style={{fontWeight: 'bold', fontSize: '20px', marginRight: '5px', gap: '0',Height: '100vh'}}>
            <div className="col-sm d-flex align-items-center">
                    <label htmlFor="mother_data" className="col-form-label">ข้อมูลมารดา</label>
                </div>
            </div>

            {/* <br></br> */}
            {/* <h2 className="col-sm d-flex align-items-center" style={{marginLeft: '15px',fontSize: '18px'}}>เคยบันทึกข้อมูลมารดาแล้วหรือไม่</h2> */}
            {/* <h2 className="card-heading mb-0 mx-3" style={{ fontSize: '16px', color: 'red' ,marginTop:"5px"}}>
                    **เลือก ใช่ กรณีเคยบันทึกข้อมูลของตนสำหรับใช้สมัครเรียนให้บุตรหลานของท่าน
                </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '16px',marginLeft: '15px' ,marginTop:"5px"}}>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="usedToRecordMotherData?" id="usedToRecordMotherData" onChange={handleIsMotherRecordData} />
                    <label className="form-check-label custom-body" style={{ fontSize: '16px',marginRight: '10px' }} htmlFor="usedToRecordMotherData">
                    ใช่
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="usedToRecordMotherData?" id="notYetRecordMotherData" onChange={handleIsMotherRecordData} />
                    <label className="form-check-label custom-body" style={{ fontSize: '16px',marginRight: '10px' }} htmlFor="notYetRecordMotherData">
                    ไม่ใช่
                    </label>
                </div>
            </div> */}

        {/* {isMotherRecordData ? (
            <> */}
                <div style={{fontSize: '18px',marginTop:"5px"}}>
                    <div className="d-flex align-items-center"style={{flexWrap:"wrap"}}>
                        <label htmlFor="Mother_Email" className="col-form-label mb-0 mx-3">อีเมล</label>
                        <h2 className="card-heading mb-0 mx-3" style={{ fontSize: '16px', color: 'blue' }}>
                            (อีเมลที่ท่านกรอกนี้สามารถใช้ตรวจสอบข้อมูลนักเรียนของโรงเรียนซึ่งเป็นบุตรหลานของท่าน)
                        </h2>
                    </div>
                    <div className="align-items-center"style={{ marginTop: '5px',maxWidth:"35%"}}>  
                        <input type="text" className="form-control mb-0 mx-3" id="Mother_Email" name="Mother_Email" placeholder="กรอกอีเมลมารดา" value={MotherEmail} onChange={handleMotherEmailChange} />
                    </div>
                </div>
            {/* </>
        ) : (
            <> */}
            {/* <br></br> */}
            <br />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '18px', marginLeft: '15px' }}>

                    <div className="d-flex align-items-center">
                        <label htmlFor="mother_surname" className="col-form-label">ชื่อ</label>
                    </div>
                    <div className="align-items-center" style={{maxWidth:"100%"}}>
                        <input type="text" className="form-control" id="mother_surname" name="mother_surname" placeholder="กรอกชื่อ" value={MotherFirstname} onChange={handleMotherFirstnameChange} />
                        </div>
                    <div className="align-items-center">
                        <label htmlFor="mother_lastname" className="col-form-label">นามสกุล</label>
                        </div>
                    <div className="align-items-center" style={{maxWidth:"100%"}}>
                        <input type="text" className="form-control" id="mother_lastname" name="mother_lastname" placeholder="กรอกนามสกุล"value={MotherLastname} onChange={handleMotherLastnameChange}  />
                        </div>
                    <div className="align-items-center">
                        <label htmlFor="mother_dob" className="col-form-label">วัน/เดือน/ปีเกิด</label>
                    </div>
                    <div className="d-flex align-items-center" style={{maxWidth:"100%"}}>
                        <Date_Picker value={MotherDateOfBirth} onChange={handlMotherDateOfBirthChange} />
                        {/* <input type="text" className="form-control" id="mother_age" name="mother_age" placeholder="กรอกอายุ" /> */}
                        {/* <label htmlFor="year" className="col-form-label"style={{marginLeft: '15px'}}>ปี</label> */}
                    </div>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '18px',marginLeft: '15px', marginTop:'5px' }}>

                    <h2 className="col-form-label" style={{ fontFamily: 'Kanit, sans-serif', fontSize: '18px'}}>เป็นคนต่างชาติใช่หรือไม่</h2>
                    <div className="d-flex align-items-center"style={{ flexWrap: 'wrap'}} >
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="Motherforeigner?" id="MotherForeigner" value={isMotherForeigner} onChange={handleIsMotherForeigner} />
                            <label className="form-check-label custom-body"style={{ fontSize: '16px',marginRight: '10px' }} htmlFor="MotherForeigner">
                            ใช่
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="Motherforeigner?" id="MotherNotForeigner" value={isMotherForeigner} onChange={handleIsMotherForeigner} />
                            <label className="form-check-label custom-body" style={{ fontSize: '16px',marginRight: '10px' }} htmlFor="MotherNotForeigner">
                            ไม่
                            </label>
                        </div>
                    </div>
                    {/* </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', whiteSpace: 'nowrap', fontSize: '18px',marginLeft: '15px' }}> */}
                    {/* ใช้เงื่อนไขเพื่อตรวจสอบว่าถ้าเป็นคนต่างชาติให้แสดงส่วนของสัญชาติ */}
                    {isMotherForeigner && (
                        <>
                        <div className="d-flex align-items-center">
                        <label htmlFor="mother_Nationality" className="col-form-label">สัญชาติ</label>
                        </div>
                        <div className="align-items-center" style={{maxWidth:"100%"}}>
                        <input type="text" className="form-control" id="mother_Nationality" name="mother_Nationality" placeholder="กรอกสัญชาติ"value={MotherNationality} onChange={handleMotherNationalityChange}/>
                        </div>
                        </>
                    )}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '18px',marginLeft: '15px' }}>
                
                            {/* <div className="d-flex align-items-center">
                                <label htmlFor="mother_Occupation" className="col-form-label">วุฒิการศึกษา</label>
                            </div>
                            <div class="h-screen flex flex-col justify-left sm:flex-row">
                                <div class="sm:w-1_3 sm:pr-3">
                                    <div class="dropdown" style={{ maxWidth: '100%' }}> 
                                        <select value={selectedOption} onChange={handleSelectChange} class="custom-select w-full">
                                            <option value="ระบุหมายเหตุ">ระบุวุฒิการศึกษา</option>
                                            <option value="เพื่อใช้ในการขอทุนการศึกษา">ปริญญาตรี</option>
                                            <option value="เพื่อใช้ในการสมัครเข้าศึกษาต่อ">ปริญญาโท</option>
                                            <option value="เพื่อใช้ในการสมัครเข้าศึกษาต่อ">ปริญญาเอก</option>
                                        </select>
                                    </div>
                                </div>
                            </div> */}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '18px',marginLeft: '15px', margintop: '5px' }}>
                        <div className="d-flex align-items-center">
                            <label htmlFor="mother_Occupation" className="col-form-label">อาชีพ</label>
                        </div>
                        <div className="align-items-center" style={{maxWidth:"100%"}}>       
                            <input type="text" className="form-control" id="mother_Occupation" name="mother_Occupation" placeholder="กรอกอาชีพ"value={MotherOccupation} onChange={handleMotherOccupationChange} />
                        </div>
                        <div className="d-flex align-items-center">
                            <label htmlFor="mother_Workplace" className="col-form-label">สถานที่ทำงาน</label>
                        </div>
                        <div className="align-items-center" style={{maxWidth:"100%"}}>   
                            <input type="text" className="form-control" id="mother_Workplace" name="mother_Workplace" placeholder="กรอกสถานที่ทำงาน"value={MotherOffice} onChange={handleMotherOfficeChange} />
                        </div>
                        <div className="d-flex align-items-center">
                            <label htmlFor="mother_phoneNumber" className="col-form-label">โทรศัพท์</label>
                            </div>
                        <div className="align-items-center" style={{maxWidth:"100%"}}>   
                            <input type="text" className="form-control" id="mother_phoneNumber" name="mother_phoneNumber" placeholder="กรอกหมายเลขโทรศัพท์"value={MotherTel} onChange={handleMotherTelChange} />
                        </div>
                     
                        
                </div>
            {/* </>
        )} */}

        <br></br>
        <div className="row" style={{fontWeight: 'bold', fontSize: '20px', marginRight: '5px', gap: '0',Height: '100vh'}}>

            <div className="col-sm d-flex align-items-center" >
                <label htmlFor="parents_data" className="col-form-label">ข้อมูลผู้ปกครอง</label>
            </div>
        </div>

            <br></br>
                <h2 className="col-sm d-flex align-items-center" style={{marginLeft: '15px',fontSize: '16px'}}>ผู้ปกครองเป็น</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '16px',marginLeft: '15px' ,marginTop:"5px"}}>
                
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="whoAreParent?" id="FatherIsParent" onChange={handlewhoAreParent} />
                    <label className="form-check-label custom-body" style={{ fontSize: '16px',marginRight: '10px' }} htmlFor="FatherIsParent">
                    บิดา
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="whoAreParent?" id="MotherIsParent" onChange={handlewhoAreParent} />
                    <label className="form-check-label custom-body" style={{ fontSize: '16px',marginRight: '10px' }} htmlFor="MotherIsParent">
                    มารดา
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="whoAreParent?" id="FatherAndMotherAreParent" onChange={handlewhoAreParent} />
                   
                    <label className="form-check-label custom-body" style={{ fontSize: '16px',marginRight: '10px', flexWrap: "wrap" }} htmlFor="FatherAndMotherAreParent">
                    บิดาและมารดา
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="whoAreParent?" id="SomeoneElseIsParent" onChange={handlewhoAreParent} />
                    <label className="form-check-label custom-body" style={{ fontSize: '16px',marginRight: '10px' }} htmlFor="SomeoneElseIsParent">
                    อื่นๆ
                    </label>
                </div>
            
                </div>
                {/* <br></br> */}

                {(whoAreParent === 'SomeoneElseIsParent') && (
                    <>
                        {/* <h2 className="col-sm d-flex align-items-center" style={{marginLeft: '15px',fontSize: '18px'}}>เคยบันทึกข้อมูลผู้ปกครองแล้วหรือไม่</h2>
                        <h2 className="card-heading mb-0 mx-3" style={{ fontSize: '16px', color: 'red' ,marginTop:"5px"}}>
                                **เลือก ใช่ กรณีเคยบันทึกข้อมูลของตนสำหรับใช้สมัครเรียนให้บุตรหลานของท่าน
                            </h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '16px',marginLeft: '15px' ,marginTop:"5px"}}>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="usedToRecordParentData?" id="usedToRecordParentData" onChange={handleIsParentRecordData} />
                                <label className="form-check-label custom-body" style={{ fontSize: '16px',marginRight: '10px' }} htmlFor="usedToRecordParentData">
                                ใช่
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="usedToRecordParentData?" id="notYetRecordParentData" onChange={handleIsParentRecordData} />
                                <label className="form-check-label custom-body" style={{ fontSize: '16px',marginRight: '10px' }} htmlFor="notYetRecordParentData">
                                ไม่ใช่
                                </label>
                            </div>
                        </div> */}

                        {/* {isParentRecordData ? (
                    <> */}
                        <div style={{fontSize: '18px',marginTop:"10px"}}>
                            <div className="d-flex align-items-center" style={{flexWrap:"wrap"}}>
                                <label htmlFor="ParentEmail" className="col-form-label mb-0 mx-3">อีเมล</label>
                                <h2 className="card-heading mb-0 mx-3" style={{ fontSize: '16px', color: 'blue' }}>
                                    (อีเมลที่ท่านกรอกนี้สามารถใช้ตรวจสอบข้อมูลนักเรียนของโรงเรียนซึ่งเป็นบุตรหลานของท่าน)
                                </h2>
                            </div>
                            <div className="align-items-center"style={{ marginTop: '5px',maxWidth:"65%"}}>  
                                <input type="text" className="form-control mb-0 mx-3" id="ParentEmail" name="ParentEmail" placeholder="กรอกอีเมลผู้ปกครอง" value={ParentEmail} onChange={handleParentEmailChange}/>
                            </div>
                        </div>
                    {/* </>
                    ) : (
                    <>  */}
                    {/* //SomeoneElseIsParent */}
                    <br></br>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '18px',marginLeft: '15px' }}>

                        <div className="d-flex align-items-center">
                            <label htmlFor="SomeoneElseIsParent_surname" className="col-form-label">ชื่อ</label>
                        </div>
                        
                        <div className="align-items-center" style={{maxWidth:"100%"}}>
                            <input type="text" className="form-control" id="SomeoneElseIsParent_surname" name="SomeoneElseIsParent_surname" placeholder="กรอกชื่อ" value={ParentFirstname} onChange={handleParentFirstnameChange}/>
                        </div>

                        <div className="align-items-center">
                            <label htmlFor="SomeoneElseIsParent_lastname" className="col-form-label">นามสกุล</label>
                        </div>

                        <div className="align-items-center" style={{maxWidth:"100%"}}>
                            <input type="text" className="form-control" id="SomeoneElseIsParent_lastname" name="SomeoneElseIsParent_lastname" placeholder="กรอกนามสกุล" value={ParentLastname} onChange={handleParentLastnameChange}/>
                        </div>

                        {/* <div className="align-items-center">
                            <label htmlFor="SomeoneElseIsParent_age" className="col-form-label">อายุ</label>
                        </div>

                        <div className="d-flex align-items-center" style={{maxWidth:"100%"}}>
                            <input type="text" className="form-control" id="SomeoneElseIsParent_age" name="SomeoneElseIsParent_age" placeholder="กรอกอายุ" />
                            <label htmlFor="year" className="col-form-label"style={{marginLeft: '15px'}}>ปี</label>
                        </div> */}

                        <div className="align-items-center">
                            <label htmlFor="SomeoneElseIsParent_dob" className="col-form-label">วัน/เดือน/ปีเกิด</label>
                        </div>
                        <div className="d-flex align-items-center" style={{maxWidth:"100%"}}>
                            <Date_Picker value={ParentDateOfBirth} onChange={handlParentDateOfBirthChange} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '18px',marginLeft: '15px' }}>

                        <h2 className="col-form-label" style={{ fontFamily: 'Kanit, sans-serif', fontSize: '18px'}}>เป็นคนต่างชาติใช่หรือไม่</h2>
                        <div className="d-flex align-items-center"style={{ flexWrap: 'wrap'}}>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Parentforeigner?" id="ParentForeigner" value={isParentForeigner} onChange={handleIsParentForeigner} />
                                <label className="form-check-label custom-body"style={{ fontSize: '16px',marginRight: '10px' }} htmlFor="ParentForeigner">
                                ใช่
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Parentforeigner?" id="ParentNotForeigner" value={isParentForeigner}onChange={handleIsParentForeigner} />
                                <label className="form-check-label custom-body" style={{ fontSize: '16px',marginRight: '10px' }} htmlFor="ParentNotForeigner">
                                ไม่
                                </label>
                            </div>
                        </div>
                        {/* </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', whiteSpace: 'nowrap', fontSize: '18px',marginLeft: '15px' }}> */}
                        {/* ใช้เงื่อนไขเพื่อตรวจสอบว่าถ้าเป็นคนต่างชาติให้แสดงส่วนของสัญชาติ */}
                        {isParentForeigner && (
                            <>
                            <div className="d-flex align-items-center">
                                <label htmlFor="parent_Nationality" className="col-form-label">สัญชาติ</label>
                            </div>
                            <div className="align-items-center" style={{maxWidth:"100%"}}>
                                <input type="text" className="form-control" id="parent_Nationality" name="parent_Nationality" placeholder="กรอกสัญชาติ"value={ParentNationality} onChange={handleParentNationalityChange}/>
                            </div>
                            </>
                        )}
                    </div>

                        {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '18px',marginLeft: '15px' }}>
                
                            <div className="d-flex align-items-center">
                                <label htmlFor="Parent_Occupation" className="col-form-label">วุฒิการศึกษา</label>
                            </div>
                            <div class="h-screen flex flex-col justify-left sm:flex-row">
                                <div class="sm:w-1_3 sm:pr-3">
                                <div class="dropdown" style={{ maxWidth: '100%' }}>
                                    <select value={selectedOption} onChange={handleSelectChange} class="custom-select w-full">
                                        <option value="ระบุหมายเหตุ">ระบุวุฒิการศึกษา</option>
                                        <option value="เพื่อใช้ในการขอทุนการศึกษา">ปริญญาตรี</option>
                                        <option value="เพื่อใช้ในการสมัครเข้าศึกษาต่อ">ปริญญาโท</option>
                                        <option value="เพื่อใช้ในการสมัครเข้าศึกษาต่อ">ปริญญาเอก</option>
                                    </select>
                                </div>
                            </div>
                            </div>
                        </div> */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '18px',marginLeft: '15px' }}>
                        <div className="d-flex align-items-center">
                            <label htmlFor="Parent_Occupation" className="col-form-label">อาชีพ</label>
                        </div>
                        <div className="align-items-center" style={{maxWidth:"100%"}}>       
                            <input type="text" className="form-control" id="Parent_Occupation" name="Parent_Occupation" placeholder="กรอกอาชีพ" value={ParentOccupation} onChange={handleParentOccupationChange}/>
                        </div>
                        <div className="d-flex align-items-center">
                            <label htmlFor="Parent_Workplace" className="col-form-label">สถานที่ทำงาน</label>
                        </div>
                        <div className="align-items-center" style={{maxWidth:"100%"}}>   
                            <input type="text" className="form-control" id="Parent_Workplace" name="Parent_Workplace" placeholder="กรอกสถานที่ทำงาน" value={ParentOffice} onChange={handleParentOfficeChange}/>
                        </div>
                        <div className="d-flex align-items-center">
                            <label htmlFor="SomeoneElseIsParent_phoneNumber" className="col-form-label">โทรศัพท์</label>
                        </div>
                        <div className="align-items-center" style={{maxWidth:"100%"}}>   
                            <input type="text" className="form-control" id="SomeoneElseIsParent_phoneNumber" name="SomeoneElseIsParent_phoneNumber" placeholder="กรอกหมายเลขโทรศัพท์" value={ParentTel} onChange={handleParentTelChange} />
                        </div>
                        {/* <div className="d-flex align-items-center">
                        {/* <div className="d-flex align-items-center">
                            <label htmlFor="SomeoneElseIsParentEmail" className="col-form-label">อีเมล</label>
                        </div>
                        <div className="align-items-center" style={{maxWidth:"100%"}}>   
                            <input type="text" className="form-control" id="SomeoneElseIsParentEmail" name="SomeoneElseIsParentEmail" placeholder="กรอกอีเมลผู้ปกครอง"/>
                        </div> */}
                    {/* </div>  */}
                        <div className="d-flex align-items-center">
                            <label htmlFor="Parent_Relation" className="col-form-label">เกี่ยวข้องเป็น</label>
                        </div>
                        <div className="align-items-center" style={{maxWidth:"100%"}}>   
                            <input type="text" className="form-control" id="Parent_Relation" name="Parent_Relation" placeholder="กรอกความเกี่ยวข้องกับผู้สมัคร" value={ParentRole} onChange={handleParentRoleChange}/>
                        </div>
                        
                    </div>
            
                    </>
                //     )}
                // </>
                )}
                
                <br></br>

    </div>
  );
}

export default ParentsInfo;
