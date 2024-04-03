var express = require('express')
const router = express.Router();

module.exports = function(connection) {
    router.post('/teaching-assignment-get-year', (req, res) => {
        const {Role, email} = req.body
        let option
        if (Role === "administrator") {
            option = " "
        } else {
            option = "WHERE Personnel_Email = ?" 
        }
        const sql = `
            SELECT distinct 
                year
            FROM 
                teaching_assignment
            ${option}
            ORDER BY year ASC
        `;
        connection.query(sql,[email], (err, results) => {
            if (err) {
                console.error('Error querying assignment information:', err);
                return res.status(500).json({ error: 'Failed to retrieve year of assignment information' });
            }

            // Check if student information is found
            if (results.length === 0) {
                return res.status(404).json({ error: 'year of assignment information not found' });
            }

            // Return the student information
            res.status(200).json(results);
        });
    });

    router.post('/teaching-assignment-get-semester', (req, res) => {
        const { year, Role, email } = req.body;
        let option
        if (Role === "administrator") {
            option = " "
        } else {
            option = "AND Personnel_Email = ?" 
        }
        const sql = `
            SELECT distinct 
                Semester
            FROM 
                teaching_assignment
            WHERE
                year = ?
            ${option}
            ORDER BY semester ASC
        `;
        connection.query(sql, [year,email], (err, results) => {
            if (err) {
                console.error('Error querying assignment information:', err);
                return res.status(500).json({ error: 'Failed to retrieve semester of assignment information' });
            }

            // Check if student information is found
            if (results.length === 0) {
                return res.status(404).json({ error: 'semester of assignment information not found' });
            }

            // Return the student information
            res.status(200).json(results);
        });
    });

    router.post('/teaching-assignment-get-subject', (req, res) => {
        const { year, semester, Role, email } = req.body;
        let option
        if (Role === "administrator") {
            option = " "
        } else {
            option = "AND Personnel_Email = ?" 
        }
        const sql = `
            SELECT distinct 
                subject.subject_name,
                teaching_assignment.subject_id
            FROM 
                teaching_assignment
            join 
                subject
            on 
                teaching_assignment.subject_id = subject.Subject_ID
            where
                teaching_assignment.year = ?
            AND 
                teaching_assignment.semester = ?
            ${option}
        `;
        connection.query(sql,[year,semester,email], (err, results) => {
            if (err) {
                console.error('Error querying assignment information:', err);
                return res.status(500).json({ error: 'Failed to retrieve subject of assignment information' });
            }

            // Check if student information is found
            if (results.length === 0) {
                return res.status(404).json({ error: 'subject of assignment information not found' });
            }

            // Return the student information
            res.status(200).json(results);
        });
    });

    router.post('/assessment-get-full-score-midterm-final', (req, res) => {
        const { year, semester, subject } = req.body;
        const sql = `
            select 
                Full_score_mid,Full_score_final
            from 
                grade
            join
                subject
            on
                subject.Subject_ID = grade.Subject_ID
            where
                year = ${year}
            and
                Semester = ${semester}
            and
                Subject_Name = '${subject}'
            limit 1
        `;
        connection.query(sql,[year,semester,subject], (err, results) => {
            if (err) {
                console.error('Error querying full score midterm final information:', err);
                return res.status(500).json({ error: 'Failed to retrieve full score midterm final information' });
            }

            // Check if student information is found
            if (results.length === 0) {
                return res.status(404).json({ error: 'full score midterm final information not found' });
            }

            // Return the student information
            res.status(200).json(results);
        });
    });

    router.post('/assessment-get-name-proportion', (req, res) => {
        const { year, semester, subject } = req.body;
        const sql = `
            SELECT 
                assessment.Assessment_name, 
                assessment.Assessment_proportion,
                assessment.id as Assessment_id
            FROM 
                assessment
            join 
                subject
            on 
                assessment.subject_id = subject.Subject_ID
            where
                assessment.year = ? AND
                assessment.semester = ? AND
                subject.subject_name = ?
        `;
        connection.query(sql,[year,semester,subject], (err, results) => {
            if (err) {
                console.error('Error querying assignment information:', err);
                return res.status(500).json({ error: 'Failed to retrieve assessment information' });
            }

            // Check if student information is found
            if (results.length === 0) {
                return res.status(404).json({ error: 'Assessment information not found' });
            }

            // Return the student information
            res.status(200).json(results);
        });
    });

    router.post('/update-assessment', (req, res) => {
        const { assessment_name, assessment_proportion, id } = req.body;
        const sql = `
            UPDATE 
                assessment
            SET 
                Assessment_proportion = ?,
                Assessment_name = ?
            WHERE
                id = ?;
        `;
        connection.query(sql,[assessment_proportion, assessment_name, id], (err, results) => {
            if (err) {
                console.error('Error querying assignment information:', err);
                return res.status(500).json({ error: 'Failed to update assessment information' });
            }
            res.status(200).json({results, message: "Update assessment successfully"});
        });
    });

    router.post('/update-full-grade', (req, res) => {
        const { score,year,semester,suubject,term } = req.body;
        let Full_score
        if (term === 0) {
            Full_score = "Full_score_mid"
        } else if (term === 1){
            Full_score = "Full_score_final"
        }
        const sql = `
            UPDATE 
                grade
            join
                subject
            on
                subject.Subject_ID = grade.Subject_ID
            SET 
                ${Full_score} = ?
            WHERE
                grade.Year = ?
            and
                grade.Semester = ?
            and
                subject.Subject_Name = ?
        `;
        connection.query(sql,[score,year,semester,suubject], (err, results) => {
            if (err) {
                console.error('Error querying full grade information:', err);
                return res.status(500).json({ error: 'Failed to update full grade information' });
            }
            res.status(200).json({results, message: "Update full grade successfully"});
        });
    });

    router.post('/update-assessment-score', (req, res) => {
        const { score,assessment,year,semester,subject,student,full_score_final,full_score_mid } = req.body;
        let check_exist
        if (assessment !== "คะแนนสอบกลางภาค" && assessment !== "คะแนนสอบปลายภาค") {
            check_exist = `
                SELECT
                    student_assessment.id
                FROM
                    student_assessment
                JOIN
                    assessment
                ON
                    assessment.id = student_assessment.Assessment_id
                JOIN
                    subject
                ON
                    subject.Subject_ID = assessment.Subject_ID
                WHERE
                    assessment.Assessment_Name = '${assessment}'
                AND 
                    assessment.Year = ?
                AND
                    assessment.Semester = ?
                AND
                    subject.Subject_Name = ?
                AND
                    student_assessment.Students_ID = ?
            `;
        } else {
            check_exist = `
                SELECT
                    grade.id
                FROM
                    grade
                JOIN
                    subject
                ON 
                    subject.Subject_ID = grade.Subject_ID
                WHERE
                    grade.Year = ?
                AND
                    grade.Semester = ?
                AND
                    subject.Subject_Name = ?
                AND
                    grade.Student_ID = ?
            `;
        }

        connection.query(check_exist,[year,semester,subject,student], (err, outcome) => {
            if (err) {
                console.error('Error querying assignment information:', err);
                return res.status(500).json({ error: 'Failed to update assessment information' });
            }

            // update
            if (outcome.length !== 0) {
                let sql,midFinal
                if (assessment !== "คะแนนสอบกลางภาค" && assessment !== "คะแนนสอบปลายภาค") {
                    sql = `
                        UPDATE 
                            student_assessment
                        JOIN
                            assessment
                        ON
                            assessment.id = student_assessment.Assessment_id
                        JOIN
                            subject
                        ON
                            subject.Subject_ID = assessment.Subject_ID
                        SET 
                            student_assessment.Score = ?
                        WHERE
                            assessment.Assessment_Name = '${assessment}'
                        AND 
                            assessment.Year = ?
                        AND
                            assessment.Semester = ?
                        AND
                            subject.Subject_Name = ?
                        AND
                            student_assessment.Students_ID = ?
                    `;
                } else {
                    if (assessment === "คะแนนสอบกลางภาค") {
                        midFinal = "Score_mid"
                    } else {
                        midFinal = "Score_final"
                    }
                    sql = `
                        UPDATE
                            grade
                        JOIN
                            subject
                        ON 
                            subject.Subject_ID = grade.Subject_ID
                        SET
                            ${midFinal} = ?
                        WHERE
                            grade.Year = ?
                        AND
                            grade.Semester = ?   
                        AND
                            subject.Subject_Name = ?
                        AND
                            grade.Student_ID = ?
                    `;
                }
                connection.query(sql,[score,year,semester,subject,student], (err, results) => {
                    if (err) {
                        console.error('Error querying assignment information:', err);
                        return res.status(500).json({ error: 'Failed to update assessment information' });
                    }
                    res.status(200).json({results, message: "Update assessment successfully"});
                });
            } else {
                // insert
                let sql,midFinal
                if (assessment === "คะแนนสอบกลางภาค") {
                    midFinal = "Score_mid"
                } else {
                    midFinal = "Score_final"
                }
                if (assessment !== "คะแนนสอบกลางภาค" && assessment !== "คะแนนสอบปลายภาค") {
                    sql = `
                        INSERT INTO 
                            student_assessment (Students_ID,Assessment_id,Score)
                        VALUES 
                            (?, (SELECT id FROM assessment WHERE Assessment_Name = '${assessment}'), ?)
                    `;
                } else {
                    if (assessment === "คะแนนสอบกลางภาค") {
                        midFinal = "Score_mid"
                    } else {
                        midFinal = "Score_final"
                    }
                    sql = `
                        INSERT INTO 
                            grade (Subject_ID, Year, Semester, Student_ID, Full_score_mid, 
                            Full_score_final, ${midFinal})
                        VALUES 
                            ((SELECT Subject_ID FROM subject WHERE Subject_Name = '${subject}'),
                            ${year},${semester},?,${full_score_mid},${full_score_final},?);
                    `;

                }
                connection.query(sql,[student,score], (err, results) => {
                    if (err) {
                        console.error('Error querying assignment information:', err);
                        return res.status(500).json({ error: 'Failed to update assessment information' });
                    }
                    res.status(200).json({results, message: "Insert assessment successfully"});
                });
                // res.status(200).json({message: "Insert assessment successfully"});
            }
        });
    });

    router.post('/update-grade-totalScore', (req, res) => {
        const { grade,total,subject,year,semester,student } = req.body;
        const sql = `
            UPDATE
                grade
            JOIN
                subject
            ON
                subject.Subject_ID = grade.Subject_ID
            SET
                Subject_grade = ?,
                Total_score = ?
            WHERE
                Subject_Name = ?
            AND
                grade.Year = ?
            AND
                Semester = ?
            AND
                Student_ID = ?
        `;
        connection.query(sql,[grade,total,subject,year,semester,student], (err, results) => {
            if (err) {
                console.error('Error querying grade-totalScore information:', err);
                return res.status(500).json({ error: 'Failed to update grade-totalScore information' });
            }
            res.status(200).json({results, message: "Update grade-totalScore successfully"});
        });
    });

    router.post('/insert-new-assessment', (req, res) => {
        const { subject, assessment_name, assessment_proportion, year, semester } = req.body;
        // const sqlget = `
        //     select 
        //         Subject_id
        //     from 
        //         subject
        //     where 
        //         subject_name = ?;
        // `;
        // connection.query(sqlget,[subject], (err, results) => {
        //     if (err) {
        //         console.error('Error querying assignment information:', err);
        //         return res.status(500).json({ error: 'Failed to insert assessment information' });
        //     }

        //     if (results.length === 0) {
        //         return res.status(404).json({ error: 'subject information not found' });
        //     }

            const sql = `
            insert into Assessment 
                (Subject_ID, Assessment_Name, Assessment_Proportion,Year,Semester)
            VALUES
                ((select Subject_id from subject where subject_name = ?),?,?,?,?)
            `;
            connection.query(sql,[subject, assessment_name, assessment_proportion, year, semester], (err, outcome) => {
                if (err) {
                    console.error('Error querying assignment information:', err);
                    return res.status(500).json({ error: 'Failed to insert assessment information' });
                }
                res.status(200).json({outcome, message: "Insert assessment successfully"});
            });
        // });
    });

    router.post('/insert-full-grade', (req, res) => {
        const { subject,year,semester,score,term } = req.body;
        let Full_score
        if (term === "คะแนนสอบกลางภาค") {
            Full_score = "Full_score_mid"
        } else if (term === "คะแนนสอบปลายภาค"){
            Full_score = "Full_score_final"
        }
        const sql = `
            INSERT INTO Grade 
                (Subject_ID, Year, Semester, ${Full_score})
            VALUES
                ((SELECT Subject_ID FROM subject WHERE Subject_Name = ?), ?, ?, ?)
        `;
        connection.query(sql,[subject,year,semester,score], (err, results) => {
            if (err) {
                console.error('Error querying full grade information:', err);
                return res.status(500).json({ error: 'Failed to update full grade information' });
            }
            res.status(200).json({results, message: "Update full grade successfully"});
        });
    });

    router.post('/delete-assessment', (req, res) => {
        const { id } = req.body;
        const sql = `
            DELETE FROM 
                student_assessment 
            WHERE 
                Assessment_id = ?;
        `;
        connection.query(sql,[id], (err, results) => {
            if (err) {
                console.error('Error querying student assignment information:', err);
                return res.status(500).json({ error: 'Failed to delete student assessment information' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'Student assessment information not found' });
            }

            const sql = `
                DELETE FROM 
                    assessment 
                WHERE 
                    id = ? 
            `;
            connection.query(sql,[id], (err, results) => {
                if (err) {
                    console.error('Error querying assignment information:', err);
                    return res.status(500).json({ error: 'Failed to delete assessment information' });
                }

                if (results.length === 0) {
                    return res.status(404).json({ error: 'assessment information not found' });
                }

                res.status(200).json({results, message: "delete assessment successfully"});
            })
        });
    });

    router.post('/get-classYear-by-teacher', (req, res) => {
        const { email,year,semester,subject,Role } = req.body;
        let option
        if (Role === "administrator") {
            option = " "
        } else {
            option = "AND teaching_assignment.Personnel_Email = ?" 
        }
        const sql = `
            SELECT distinct
                teaching_assignment.Level
            From 
                teaching_assignment
            join 
                subject
            on 
                subject.Subject_ID = teaching_assignment.Subject_ID
            where  
                teaching_assignment.Year = ?
            and 
                teaching_assignment.Semester = ?
            and 
                subject.Subject_Name = ?
            ${option}
        `;
        connection.query(sql,[year,semester,subject,email], (err, results) => {
            if (err) {
                console.error('Error querying classroom information:', err);
                return res.status(500).json({ error: 'Failed to fetch classroom information' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'classroom information not found' });
            }

            res.status(200).json(results);
        });
    });

    router.post('/get-classRoom-by-teacher', (req, res) => {
        const { email,year,semester,subject,level,Role } = req.body;
        let option
        if (Role === "administrator") {
            option = " "
        } else {
            option = "AND teaching_assignment.Personnel_Email = ?" 
        }
        const sql = `
            SELECT distinct
                teaching_assignment.Room
            From 
                teaching_assignment
            join 
                subject
            on 
                subject.Subject_ID = teaching_assignment.Subject_ID
            where  
                teaching_assignment.Year = ?
            and 
                teaching_assignment.Semester = ?
            and 
                subject.Subject_Name = ?
            and
                teaching_assignment.Level = ?
            ${option}
        `;
        connection.query(sql,[year,semester,subject,level,email], (err, results) => {
            if (err) {
                console.error('Error querying classroom information:', err);
                return res.status(500).json({ error: 'Failed to fetch classroom information' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'classroom information not found' });
            }

            res.status(200).json(results);
        });
    }); 

    router.post('/get-student-info-by-teacher', (req, res) => {
        const { year,level,room } = req.body;
        const sql = `
            SELECT 
                student.Student_ID, student.NameTitle, student.FirstName, student.LastName 
            From 
                classroom
            join 
                student
            on 
                student.Student_ID = classroom.Student_ID
            where 
                year = ?
            and 
                level = ?
            and 
                room = ?
        `;
        connection.query(sql,[year,level,room], (err, results) => {
            if (err) {
                console.error('Error querying assignment information:', err);
                return res.status(500).json({ error: 'Failed to fetch student information' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'student information not found' });
            }

            res.status(200).json(results);
        });
    });

    router.post('/get-assessment-name-by-teacher', (req, res) => {
        const { year,semester,subject } = req.body;
        const sql = `
            SELECT 
                Assessment_Name
            From 
                assessment
            join 
                subject
            on 
                subject.Subject_ID = assessment.Subject_ID
            where 
                year = ?
            and		
                Semester = ?
            and
                subject.Subject_Name = ?
        `;
        connection.query(sql,[year,semester,subject], (err, results) => {
            if (err) {
                console.error('Error querying assessment information:', err);
                return res.status(500).json({ error: 'Failed to fetch assessment information' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'assessment information not found' });
            }

            res.status(200).json(results);
        });
    });

    router.post('/get-assessment-name-by-teacher', (req, res) => {
        const { year,semester,subject } = req.body;
        const sql = `
            SELECT 
                Assessment_Name
            From 
                assessment
            join 
                subject
            on 
                subject.Subject_ID = assessment.Subject_ID
            where 
                year = ?
            and		
                Semester = ?
            and
                subject.Subject_Name = ?
        `;
        connection.query(sql,[year,semester,subject], (err, results) => {
            if (err) {
                console.error('Error querying assessment information:', err);
                return res.status(500).json({ error: 'Failed to fetch assessment information' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'assessment information not found' });
            }

            res.status(200).json(results);
        });
    });

    router.post('/get-student-assessment-score-by-teacher', (req, res) => {
        const { student } = req.body;
        const sql = `
            SELECT
                assessment.Assessment_Name, student_assessment.Score, student.student_id
            from
                student
            join
                student_assessment
            on
                student_assessment.Students_ID = student.Student_ID
            join
                assessment
            on
                assessment.id = student_assessment.Assessment_id
            where 
                student.Student_ID in (?)
        `;
        connection.query(sql,[student], (err, results) => {
            if (err) {
                console.error('Error querying assignment information:', err);
                return res.status(500).json({ error: 'Failed to fetch student information' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'student information not found' });
            }

            res.status(200).json(results);
        });
    });
    
    router.post('/assessment-get-grade', (req, res) => {
        const { subject,year,semester,student } = req.body;
        // Total_score,Subject_grade
        const sql = `
            SELECT 
                Score_mid, Score_final,grade.Student_ID
            FROM
                grade
            JOIN
                subject
            ON
                subject.Subject_ID = grade.Subject_ID
            WHERE
                subject.Subject_Name = ?
            AND
                Year = ?
            AND
                Semester = ?
            AND
                Student_ID in (?)
        `;
        connection.query(sql,[subject,year,semester,student], (err, results) => {
            if (err) {
                console.error('Error querying full score midterm final information:', err);
                return res.status(500).json({ error: 'Failed to retrieve full score midterm final information' });
            }

            // Check if student information is found
            if (results.length === 0) {
                return res.status(404).json({ error: 'full score midterm final information not found' });
            }

            // Return the student information
            res.status(200).json(results);
        });
    });
    
    return router;
}
