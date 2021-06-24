import React, { useContext, useEffect, useState } from 'react';

import AppContext from '../context/app.context';
import { Topbar, TeacherClasses,
  Comments, AddComment, ViewStudents, AddStudent } from '../components';
import api from '../services';

import '../styles/Schools.css';

export default function Teacher() {
  const {
    classesContext: { classes, setClasses },
    tokenContext: { token } } = useContext(AppContext);
  const [relatedTeachers, setRelatedTeachers] = useState();

  useEffect(() => {
    const fetchTeachers = async (currClasses) => {
      const teachers = {};
      currClasses.forEach(async (currClass) => {
        currClass.teachers.forEach((teacher) => {
          if (!teachers[teacher.id]) {
            teachers[teacher.id] = {
              name: teacher.name, email: teacher.email,
            };
          }
        });
        if (currClass.comments) {
          currClass.comments.forEach(async (comment) => {
            if (!teachers[comment.teacher]) {
              const getUser = await api.user('get', {
                token: token.token, userId: comment.teacher });
              teachers[comment.teacher] = getUser;
            }
          });
        }
        if (currClass.students) {
          currClass.students.forEach((student) => {
            student.comments.forEach(async (comment) => {
              if (!teachers[comment.teacher]) {
                const getUser = await api.user('get', {
                  token: token.token, userId: comment.teacher });
                teachers[comment.teacher] = getUser;
              }
            });
          });
        }
      });

      setRelatedTeachers(teachers);
    };

    const getSchoolsAndClasses = async (payload) => {
      const results = await api.teacher.fetchClasses(payload);
      if (Array.isArray(results)) {
        await fetchTeachers(results);
        setClasses(results);
      }
    };
    if (!classes) {
      getSchoolsAndClasses(token);
    }
  }, [classes, setClasses, setRelatedTeachers, token]);

  const title = 'Docente';

  return (
    <section>
      <Topbar title={ title } />
      {`Bem vinda(o), ${token.name}!`}
      <TeacherClasses classes={ classes } />
      <Comments teachers={ relatedTeachers } />
      <AddComment />
      <ViewStudents teachers={ relatedTeachers } />
      <AddStudent />
    </section>
  );
}
