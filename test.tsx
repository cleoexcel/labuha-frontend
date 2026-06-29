import { useState } from "react";
import {
  Button,
  Card,
  Layout,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Checkbox,
  Radio,
} from "one-web-components-react";
import type { CheckboxProps, RadioGroupProps } from "one-web-components-react";
import axios from "axios";
import api from "./api";

const { Content } = Layout;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type YesNo = "yes" | "no" | "";
type Step = "form" | "review" | "acknowledgement";

interface FormData {
  // Personal Information
  firstName: string;
  middleName: string;
  lastName: string;
  date: string;
  street: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
  ssn: string;
  dateAvailable: string;
  desiredPay: string;
  payType: "hour" | "salary" | "";
  position: string;
  employmentType: "full-time" | "part-time" | "seasonal" | "";

  // Employment Eligibility
  usCitizen: YesNo;
  allowedToWork: YesNo;
  workedBefore: YesNo;
  workedStart: string;
  workedEnd: string;
  felony: YesNo;
  felonyExplain: string;

  // Education
  hsName: string;
  hsCityState: string;
  hsFrom: string;
  hsTo: string;
  hsGraduate: YesNo;
  hsDiploma: string;
  collegeName: string;
  collegeCityState: string;
  collegeFrom: string;
  collegeTo: string;
  collegeGraduate: YesNo;
  collegeDegree: string;
}

const initialData: FormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  date: "",
  street: "",
  apt: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  phone: "",
  ssn: "",
  dateAvailable: "",
  desiredPay: "",
  payType: "",
  position: "",
  employmentType: "",
  usCitizen: "",
  allowedToWork: "",
  workedBefore: "",
  workedStart: "",
  workedEnd: "",
  felony: "",
  felonyExplain: "",
  hsName: "",
  hsCityState: "",
  hsFrom: "",
  hsTo: "",
  hsGraduate: "",
  hsDiploma: "",
  collegeName: "",
  collegeCityState: "",
  collegeFrom: "",
  collegeTo: "",
  collegeGraduate: "",
  collegeDegree: "",
};

/** Field-field yang wajib diisi. Selain ini, boleh kosong. */
const REQUIRED_FIELDS: (keyof FormData)[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "position",
  "employmentType",
  "usCitizen",
];

type Errors = Partial<Record<keyof FormData, string>>;

/** Label yang dipakai di pesan error, supaya lebih enak dibaca dibanding nama field mentah. */
const FIELD_LABELS: Partial<Record<keyof FormData, string>> = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "E-mail",
  phone: "Phone",
  position: "Position Applied For",
  employmentType: "Employment Desired",
  usCitizen: "Are you a U.S. Citizen?",
};

/* ------------------------------------------------------------------ */
/*  Small reusable helpers (only built from the imported components)   */
/* ------------------------------------------------------------------ */

/** Teks error kecil di bawah field, dipakai untuk validasi "wajib diisi". */
function ErrorText({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <div style={{ color: "#d4380d", fontSize: 12, marginTop: 4 }}>{msg}</div>
  );
}

/** Yes / No single-select using Radio. */
function YesNoField({
  value,
  onChange,
}: {
  value: YesNo;
  onChange: (v: YesNo) => void;
}) {
  const handleChange: RadioGroupProps["onChange"] = (e) => {
    const v = (e.target.value as YesNo) ?? "";
    onChange(v);
  };

  return (
    <Radio.Group value={value} onChange={handleChange}>
      <Radio value="yes">Yes</Radio>
      <Radio value="no">No</Radio>
    </Radio.Group>
  );
}

/** Generic single-select group built with Radio. */
function SingleSelect<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T | "";
  options: { label: string; value: T }[];
  onChange: (v: T | "") => void;
}) {
  const handleChange: RadioGroupProps["onChange"] = (e) => {
    const v = (e.target.value as T) ?? "";
    onChange(v);
  };

  return (
    <Radio.Group value={value} onChange={handleChange}>
      {options.map((opt) => (
        <Radio key={opt.value} value={opt.value}>
          {opt.label}
        </Radio>
      ))}
    </Radio.Group>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function CrayonPage() {
  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Acknowledgement screen state
  const [certify, setCertify] = useState(false);
  const [signature, setSignature] = useState("");

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Begitu user mulai mengisi, hapus pesan error di field itu.
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const nextErrors: Errors = {};

    REQUIRED_FIELDS.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        const label = FIELD_LABELS[field] ?? field;
        nextErrors[field] = `${label} wajib diisi`;
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goToReview = () => {
    if (!validateForm()) {
      window.scrollTo({ top: 0 }); // biar user lihat field mana yang merah
      return;
    }
    setStep("review");
    window.scrollTo({ top: 0 });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Strapi WAJIB body-nya dibungkus { data: {...} }, tidak boleh flat.
      // Endpoint "/applications" ini mengasumsikan nama Content-Type Anda
      // di Strapi adalah "Application" (Strapi otomatis membuat plural-nya
      // jadi "applications"). Kalau nama Content-Type Anda beda, sesuaikan di sini.
      await api.post("/applications", {
        data: {
          ...formData,
          signature,
          certify,
        },
      });

      setSubmitted(true);
      window.scrollTo({ top: 0 });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Bentuk error Strapi v4: { error: { message: "...", details: {...} } }
        // (lebih bersarang dibanding Gin yang biasanya cuma { error: "..." })
        const serverMessage = error.response?.data?.error?.message;
        setSubmitError(
          serverMessage ?? "Gagal mengirim aplikasi. Silakan coba lagi."
        );
      } else {
        setSubmitError("Terjadi kesalahan yang tidak terduga.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAll = () => {
    setFormData(initialData);
    setErrors({});
    setCertify(false);
    setSignature("");
    setSubmitted(false);
    setSubmitError(null);
    setStep("form");
  };

  return (
    <>
      <Content>
        {step === "form" && (
          <FormScreen
            data={formData}
            errors={errors}
            update={update}
            onNext={goToReview}
          />
        )}

        {step === "review" && (
          <ReviewScreen
            data={formData}
            onEdit={() => setStep("form")}
            onConfirm={() => {
              setStep("acknowledgement");
              window.scrollTo({ top: 0 });
            }}
          />
        )}

        {step === "acknowledgement" && (
          <AcknowledgementScreen
            data={formData}
            submitted={submitted}
            isSubmitting={isSubmitting}
            submitError={submitError}
            certify={certify}
            signature={signature}
            onCertifyChange={setCertify}
            onSignatureChange={setSignature}
            onBack={() => setStep("review")}
            onSubmit={handleSubmit}
            onReset={resetAll}
          />
        )}
      </Content>
    </>
  );
}

/* ================================================================== */
/*  Screen 1 — Application Form                                        */
/* ================================================================== */

function FormScreen({
  data,
  errors,
  update,
  onNext,
}: {
  data: FormData;
  errors: Errors;
  update: (field: keyof FormData, value: string) => void;
  onNext: () => void;
}) {
  return (
    <Form>
      {/* ---------------------- PERSONAL INFORMATION ---------------- */}
      <Card title="Personal Information">
        <Row>
          <Col span={8}>
            <Form.Item label="First Name" name="firstName">
              <Input
                value={data.firstName}
                onChange={(e) => update("firstName", e.target.value)}
              />
              <ErrorText msg={errors.firstName} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Middle Name" name="middleName">
              <Input
                value={data.middleName}
                onChange={(e) => update("middleName", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Last Name" name="lastName">
              <Input
                value={data.lastName}
                onChange={(e) => update("lastName", e.target.value)}
              />
              <ErrorText msg={errors.lastName} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item label="Date" name="date">
              <DatePicker
                onChange={(_value, dateString) =>
                  update("date", String(dateString ?? ""))
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={18}>
            <Form.Item label="Street Address" name="street">
              <Input
                value={data.street}
                onChange={(e) => update("street", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Apt / Suite" name="apt">
              <Input
                value={data.apt}
                onChange={(e) => update("apt", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={10}>
            <Form.Item label="City" name="city">
              <Input
                value={data.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="State" name="state">
              <Input
                value={data.state}
                onChange={(e) => update("state", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="Zip Code" name="zip">
              <Input
                value={data.zip}
                onChange={(e) => update("zip", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item label="E-mail" name="email">
              <Input
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
              />
              <ErrorText msg={errors.email} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phone" name="phone">
              <Input
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
              <ErrorText msg={errors.phone} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item label="Social Security Number (SSN)" name="ssn">
              <Input
                value={data.ssn}
                onChange={(e) => update("ssn", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Form.Item label="Date Available" name="dateAvailable">
              <DatePicker
                onChange={(_value, dateString) =>
                  update("dateAvailable", String(dateString ?? ""))
                }
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Desired Pay ($)" name="desiredPay">
              <Input
                value={data.desiredPay}
                onChange={(e) => update("desiredPay", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Pay Type" name="payType">
              <SingleSelect
                value={data.payType}
                options={[
                  { label: "Hour", value: "hour" },
                  { label: "Salary", value: "salary" },
                ]}
                onChange={(v) => update("payType", v)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item label="Position Applied For" name="position">
              <Input
                value={data.position}
                onChange={(e) => update("position", e.target.value)}
              />
              <ErrorText msg={errors.position} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item label="Employment Desired" name="employmentType">
              <SingleSelect
                value={data.employmentType}
                options={[
                  { label: "Full-Time", value: "full-time" },
                  { label: "Part-Time", value: "part-time" },
                  { label: "Seasonal", value: "seasonal" },
                ]}
                onChange={(v) => update("employmentType", v)}
              />
              <ErrorText msg={errors.employmentType} />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* ---------------------- EMPLOYMENT ELIGIBILITY -------------- */}
      <Card title="Employment Eligibility">
        <Row>
          <Col span={24}>
            <Form.Item label="Are you a U.S. Citizen?" name="usCitizen">
              <YesNoField
                value={data.usCitizen}
                onChange={(v) => update("usCitizen", v)}
              />
              <ErrorText msg={errors.usCitizen} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              label="If No, are you allowed to work in the U.S.?"
              name="allowedToWork"
            >
              <YesNoField
                value={data.allowedToWork}
                onChange={(v) => update("allowedToWork", v)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              label="Have you ever worked for this employer?"
              name="workedBefore"
            >
              <YesNoField
                value={data.workedBefore}
                onChange={(v) => update("workedBefore", v)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label="If Yes, write the start and end dates"
              name="workedStart"
            >
              <Input
                value={data.workedStart}
                onChange={(e) => update("workedStart", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              label="Have you ever been convicted of a felony?"
              name="felony"
            >
              <YesNoField
                value={data.felony}
                onChange={(v) => update("felony", v)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item label="If Yes, please explain" name="felonyExplain">
              <Input
                value={data.felonyExplain}
                onChange={(e) => update("felonyExplain", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* ---------------------- EDUCATION --------------------------- */}
      <Card title="Education">
        <Row>
          <Col span={12}>
            <Form.Item label="High School" name="hsName">
              <Input
                value={data.hsName}
                onChange={(e) => update("hsName", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="City / State" name="hsCityState">
              <Input
                value={data.hsCityState}
                onChange={(e) => update("hsCityState", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Form.Item label="From" name="hsFrom">
              <DatePicker
                onChange={(_value, dateString) =>
                  update("hsFrom", String(dateString ?? ""))
                }
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="To" name="hsTo">
              <DatePicker
                onChange={(_value, dateString) =>
                  update("hsTo", String(dateString ?? ""))
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Form.Item label="Graduate?" name="hsGraduate">
              <YesNoField
                value={data.hsGraduate}
                onChange={(v) => update("hsGraduate", v)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Diploma" name="hsDiploma">
              <Input
                value={data.hsDiploma}
                onChange={(e) => update("hsDiploma", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item label="College" name="collegeName">
              <Input
                value={data.collegeName}
                onChange={(e) => update("collegeName", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="City / State" name="collegeCityState">
              <Input
                value={data.collegeCityState}
                onChange={(e) => update("collegeCityState", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Form.Item label="From" name="collegeFrom">
              <DatePicker
                onChange={(_value, dateString) =>
                  update("collegeFrom", String(dateString ?? ""))
                }
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="To" name="collegeTo">
              <DatePicker
                onChange={(_value, dateString) =>
                  update("collegeTo", String(dateString ?? ""))
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Form.Item label="Graduate?" name="collegeGraduate">
              <YesNoField
                value={data.collegeGraduate}
                onChange={(v) => update("collegeGraduate", v)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Degree" name="collegeDegree">
              <Input
                value={data.collegeDegree}
                onChange={(e) => update("collegeDegree", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Row style={{ marginTop: 16 }}>
        <Col span={24}>
          <Button onClick={onNext}>Review</Button>
        </Col>
      </Row>
    </Form>
  );
}

/* ================================================================== */
/*  Screen 2 — Review                                                  */
/* ================================================================== */

const show = (v?: string) => (v && v.trim() !== "" ? v : "-");
const showYesNo = (v: YesNo) => (v === "yes" ? "Yes" : v === "no" ? "No" : "-");
const showPayType = (v: FormData["payType"]) =>
  v === "hour" ? "Hour" : v === "salary" ? "Salary" : "-";
const showEmploymentType = (v: FormData["employmentType"]) =>
  v === "full-time"
    ? "Full-Time"
    : v === "part-time"
    ? "Part-Time"
    : v === "seasonal"
    ? "Seasonal"
    : "-";

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <Row style={{ marginBottom: 8 }}>
      <Col span={10}>
        <strong>{label}</strong>
      </Col>
      <Col span={14}>{value}</Col>
    </Row>
  );
}

function ReviewScreen({
  data,
  onEdit,
  onConfirm,
}: {
  data: FormData;
  onEdit: () => void;
  onConfirm: () => void;
}) {
  return (
    <>
      <Card title="Review — Personal Information">
        <ReviewRow
          label="Full Name"
          value={show(
            [data.firstName, data.middleName, data.lastName]
              .filter(Boolean)
              .join(" ")
          )}
        />
        <ReviewRow label="Date" value={show(data.date)} />
        <ReviewRow
          label="Address"
          value={show(
            [data.street, data.apt, data.city, data.state, data.zip]
              .filter(Boolean)
              .join(", ")
          )}
        />
        <ReviewRow label="E-mail" value={show(data.email)} />
        <ReviewRow label="Phone" value={show(data.phone)} />
        <ReviewRow label="SSN" value={show(data.ssn)} />
        <ReviewRow label="Date Available" value={show(data.dateAvailable)} />
        <ReviewRow
          label="Desired Pay"
          value={
            data.desiredPay
              ? `$${data.desiredPay} (${showPayType(data.payType)})`
              : "-"
          }
        />
        <ReviewRow label="Position Applied For" value={show(data.position)} />
        <ReviewRow
          label="Employment Desired"
          value={showEmploymentType(data.employmentType)}
        />
      </Card>

      <Card title="Review — Employment Eligibility">
        <ReviewRow label="U.S. Citizen?" value={showYesNo(data.usCitizen)} />
        <ReviewRow
          label="Allowed to work in U.S.?"
          value={showYesNo(data.allowedToWork)}
        />
        <ReviewRow
          label="Worked for this employer before?"
          value={showYesNo(data.workedBefore)}
        />
        <ReviewRow label="Start / End Dates" value={show(data.workedStart)} />
        <ReviewRow
          label="Convicted of a felony?"
          value={showYesNo(data.felony)}
        />
        <ReviewRow label="Explanation" value={show(data.felonyExplain)} />
      </Card>

      <Card title="Review — Education">
        <ReviewRow label="High School" value={show(data.hsName)} />
        <ReviewRow label="HS City / State" value={show(data.hsCityState)} />
        <ReviewRow
          label="HS From - To"
          value={
            data.hsFrom || data.hsTo
              ? `${show(data.hsFrom)} - ${show(data.hsTo)}`
              : "-"
          }
        />
        <ReviewRow label="HS Graduate?" value={showYesNo(data.hsGraduate)} />
        <ReviewRow label="Diploma" value={show(data.hsDiploma)} />
        <ReviewRow label="College" value={show(data.collegeName)} />
        <ReviewRow
          label="College City / State"
          value={show(data.collegeCityState)}
        />
        <ReviewRow
          label="College From - To"
          value={
            data.collegeFrom || data.collegeTo
              ? `${show(data.collegeFrom)} - ${show(data.collegeTo)}`
              : "-"
          }
        />
        <ReviewRow
          label="College Graduate?"
          value={showYesNo(data.collegeGraduate)}
        />
        <ReviewRow label="Degree" value={show(data.collegeDegree)} />
      </Card>

      <Row style={{ marginTop: 16 }}>
        <Col span={4}>
          <Button onClick={onEdit}>Back / Edit</Button>
        </Col>
        <Col span={6}>
          <Button onClick={onConfirm}>Confirm &amp; Continue</Button>
        </Col>
      </Row>
    </>
  );
}

/* ================================================================== */
/*  Screen 3 — Acknowledgement                                         */
/* ================================================================== */

function AcknowledgementScreen({
  data,
  submitted,
  isSubmitting,
  submitError,
  certify,
  signature,
  onCertifyChange,
  onSignatureChange,
  onBack,
  onSubmit,
  onReset,
}: {
  data: FormData;
  submitted: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  certify: boolean;
  signature: string;
  onCertifyChange: (v: boolean) => void;
  onSignatureChange: (v: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  onReset: () => void;
}) {
  if (submitted) {
    const fullName = [data.firstName, data.middleName, data.lastName]
      .filter(Boolean)
      .join(" ");
    return (
      <Card title="Application Submitted">
        <p>
          Thank you{fullName ? `, ${fullName}` : ""}. Your application has been
          submitted successfully.
        </p>
        <Row style={{ marginTop: 16 }}>
          <Col span={8}>
            <Button onClick={onReset}>Start New Application</Button>
          </Col>
        </Row>
      </Card>
    );
  }

  const [ackErrors, setAckErrors] = useState<{
    certify?: string;
    signature?: string;
  }>({});

  const handleCertify: CheckboxProps["onChange"] = (e) => {
    onCertifyChange(e.target.checked);
    if (ackErrors.certify) {
      setAckErrors((prev) => ({ ...prev, certify: undefined }));
    }
  };

  const handleSignatureChange = (v: string) => {
    onSignatureChange(v);
    if (ackErrors.signature) {
      setAckErrors((prev) => ({ ...prev, signature: undefined }));
    }
  };

  const handleSubmitClick = () => {
    const nextErrors: { certify?: string; signature?: string } = {};
    if (!certify) nextErrors.certify = "Anda harus menyetujui pernyataan ini";
    if (!signature.trim()) nextErrors.signature = "Signature wajib diisi";

    setAckErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onSubmit();
    }
  };

  return (
    <Card title="Acknowledgement">
      <p>
        I certify that the information provided in this application is true and
        complete to the best of my knowledge. I understand that any false
        statement or omission may disqualify me from employment or be grounds
        for dismissal.
      </p>

      <Form>
        <Form.Item label="" name="certify">
          <Checkbox checked={certify} onChange={handleCertify}>
            I have read and agree to the statement above
          </Checkbox>
          <ErrorText msg={ackErrors.certify} />
        </Form.Item>

        <Row>
          <Col span={12}>
            <Form.Item label="Signature (type your full name)" name="signature">
              <Input
                value={signature}
                onChange={(e) => handleSignatureChange(e.target.value)}
                disabled={isSubmitting}
              />
              <ErrorText msg={ackErrors.signature} />
            </Form.Item>
          </Col>
        </Row>

        {submitError && (
          <Row>
            <Col span={24}>
              <div style={{ color: "#d4380d", marginBottom: 8 }}>
                {submitError}
              </div>
            </Col>
          </Row>
        )}

        <Row style={{ marginTop: 16 }}>
          <Col span={4}>
            <Button onClick={onBack} disabled={isSubmitting}>
              Back
            </Button>
          </Col>
          <Col span={6}>
            <Button onClick={handleSubmitClick} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}