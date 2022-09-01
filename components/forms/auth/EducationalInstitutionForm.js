import CustomInput from "../../inputs/customInput";
export default function EducationalInstitutionForm({
  references = {},

  setFormErrors,
  formErrors = {},
  isRegister = true,
  registrationType = "standard",
  requiredFields = [],
}) {
  return (
    <>
      {" "}
      <CustomInput
        reference={references.eduRef}
        type="text"
        name="EducationalInstitution"
        placeholder="Educational Institution"
        formErrors={formErrors}
        id="edu_institution"
        setFormErrors={setFormErrors}
        isRegister={isRegister}
        isRequired={requiredFields.includes("EducationalInstitution")}
      />
      <CustomInput
        reference={references.teacherRef}
        type="text"
        placeholder="Professor/Lecturer"
        name="Teacher"
        formErrors={formErrors}
        id="edu_teacher"
        setFormErrors={setFormErrors}
        isRegister={isRegister}
        isRequired={requiredFields.includes("Teacher")}
      />
    </>
  );
}
