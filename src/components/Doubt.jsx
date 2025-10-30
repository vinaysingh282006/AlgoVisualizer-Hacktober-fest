import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  Send,
  CheckCircle2,
  Loader2,
  Mail,
  HelpCircle,
  User,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/doubt.css";

const MAX_CHARS = 400;

const Doubt = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [doubt, setDoubt] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [doubtError, setDoubtError] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [showTooltip, setShowTooltip] = useState(false);

  // Hide confirmation/error message after 3 seconds (when not loading)
  useEffect(() => {
    if (submitStatus && submitStatus !== "loading") {
      const timer = setTimeout(() => setSubmitStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const validateName = () => {
    if (!name) {
      setNameError("Please enter your name.");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("Please enter your email address.");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateDoubt = () => {
    if (!doubt) {
      setDoubtError("Please enter your doubt.");
      return false;
    }
    if (doubt.length > MAX_CHARS) {
      setDoubtError(`Your doubt is too long. Max ${MAX_CHARS} characters.`);
      return false;
    }
    setDoubtError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isDoubtValid = validateDoubt();

    if (isNameValid && isEmailValid && isDoubtValid) {
      try {
        // Simulate async submission
        setSubmitStatus("loading");
        setTimeout(() => {
          // emulate success path
          setSubmitStatus("success");
          setName("");
          setEmail("");
          setDoubt("");
        }, 1200);
      } catch (error) {
        setSubmitStatus("error");
      }
    } else {
      setSubmitStatus(null);
    }
  };

  const isFilled = {
    name: Boolean(name),
    email: Boolean(email),
    doubt: Boolean(doubt),
  };

  const isValidToSubmit =
    !nameError && !emailError && !doubtError && name.trim() && email.trim() && doubt.trim();

  const container = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const stagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      className="doubt-section"
      variants={container}
      initial="hidden"
      animate="show"
      aria-labelledby="doubt-heading"
    >
      {/* Decorative animated blobs */}
      <motion.div
        className="doubt-blob blob-a"
        aria-hidden="true"
        initial={{ x: -80, y: -40, scale: 0.9, opacity: 0.6 }}
        animate={{ x: 0, y: 0, scale: 1, opacity: 0.9 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="doubt-blob blob-b"
        aria-hidden="true"
        initial={{ x: 100, y: 60, scale: 0.9, opacity: 0.5 }}
        animate={{ x: 0, y: 0, scale: 1, opacity: 0.8 }}
        transition={{
          duration: 2.4,
          delay: 0.3,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />

      <motion.div className="doubt-card" variants={stagger}>
        <motion.div className="doubt-header" variants={itemUp}>
          <motion.h2 id="doubt-heading" className="doubt-title">
            Have a Doubt?
          </motion.h2>
          
          {/* Functional Question Mark Icon with Tooltip */}
          <motion.div 
            className="info-icon-wrapper"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Info className="info-icon" size={24} aria-label="Information about doubt submission" />
            
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  className="tooltip"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="tooltip-content">
                    <h4>How to Submit a Doubt</h4>
                    <ul>
                      <li>✓ Provide your name and valid email</li>
                      <li>✓ Be specific about your problem</li>
                      <li>✓ Include error messages if any</li>
                      <li>✓ Mention the algorithm/data structure</li>
                      <li>✓ Add input/output examples</li>
                    </ul>
                    <p className="tooltip-footer">We'll respond within 24-48 hours!</p>
                  </div>
                  <div className="tooltip-arrow"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.p className="doubt-subtitle" variants={itemUp}>
          Ask anything about algorithms or data structures. We'll help you get
          unstuck-fast.
        </motion.p>

        {/* Status banners */}
        <AnimatePresence>
          {submitStatus === "success" && (
            <motion.div
              key="success-banner"
              className="banner success"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              role="status"
              aria-live="polite"
            >
              <CheckCircle2 size={18} />
              <span>Your doubt has been submitted successfully!</span>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              key="error-banner"
              className="banner error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              role="alert"
            >
              <AlertCircle size={18} />
              <span>
                An error occurred while submitting your doubt. Please try again.
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          className="doubt-form"
          variants={itemUp}
        >
          {/* Name and Email fields in a flex container */}
          <motion.div className="fields-row" variants={itemUp}>
            {/* Name */}
            <motion.div
              className={`field ${nameError ? "has-error" : ""}`}
              variants={itemUp}
            >
              <User className="field-icon" aria-hidden="true" />
              <input
                id="name"
                type="text"
                name="name"
                placeholder=" "
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) validateName();
                }}
                onBlur={validateName}
                aria-invalid={!!nameError}
                aria-describedby={nameError ? "name-error" : undefined}
                aria-label="Your name"
                autoComplete="name"
                required
                data-filled={isFilled.name}
                className="field-input"
              />
              <label htmlFor="name" className="field-label">
                Your Name
              </label>

              <AnimatePresence>
                {nameError && (
                  <motion.div
                    id="name-error"
                    className="error-message"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    <AlertCircle size={16} className="error-icon" />
                    <span>{nameError}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Email */}
            <motion.div
              className={`field ${emailError ? "has-error" : ""}`}
              variants={itemUp}
            >
              <Mail className="field-icon" aria-hidden="true" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder=" "
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) validateEmail();
                }}
                onBlur={validateEmail}
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-error" : undefined}
                aria-label="Email address"
                autoComplete="email"
                required
                data-filled={isFilled.email}
                className="field-input"
              />
              <label htmlFor="email" className="field-label">
                Your Email
              </label>

              <AnimatePresence>
                {emailError && (
                  <motion.div
                    id="email-error"
                    className="error-message"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    <AlertCircle size={16} className="error-icon" />
                    <span>{emailError}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Doubt */}
          <motion.div
            className={`field field-textarea ${doubtError ? "has-error" : ""}`}
            variants={itemUp}
          >
            <div className="textarea-header">
              <HelpCircle className="field-icon textarea-icon" aria-hidden="true" />
              <label htmlFor="doubt" className="field-label-static">
                Your Doubt
              </label>
              <motion.span
                className={`counter ${doubt.length > MAX_CHARS ? "over" : ""}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
              >
                {Math.min(doubt.length, MAX_CHARS)}/{MAX_CHARS}
              </motion.span>
            </div>
            
            <textarea
              id="doubt"
              name="doubt"
              placeholder="Describe your doubt in detail..."
              rows="6"
              value={doubt}
              onChange={(e) => {
                const v = e.target.value;
                setDoubt(v.slice(0, MAX_CHARS + 1));
                if (doubtError) validateDoubt();
              }}
              onBlur={validateDoubt}
              aria-invalid={!!doubtError}
              aria-describedby="doubt-help"
              aria-label="Describe your doubt"
              required
              data-filled={isFilled.doubt}
              className="field-input textarea"
            />

            <div id="doubt-help" className="textarea-footer">
              <AnimatePresence>
                {doubtError ? (
                  <motion.div
                    key="doubt-error"
                    className="error-message"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    <AlertCircle size={16} className="error-icon" />
                    <span>{doubtError}</span>
                  </motion.div>
                ) : (
                  <motion.span
                    className="helper-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    exit={{ opacity: 0 }}
                  >
                    💡 Be specific. Add inputs, constraints, or the error you saw.
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div className="button-row" variants={itemUp}>
            <motion.button
              type="submit"
              className="submit-btn"
              disabled={!isValidToSubmit || submitStatus === "loading"}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Submit your doubt"
            >
              {submitStatus === "loading" ? (
                <>
                  <Loader2 className="spin" size={18} />
                  Submitting…
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setName("");
                setEmail("");
                setDoubt("");
                setNameError("");
                setEmailError("");
                setDoubtError("");
                setSubmitStatus(null);
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Cancel and clear the form"
            >
              Cancel
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.section>
  );
};

export default Doubt;
