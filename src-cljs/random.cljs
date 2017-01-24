(ns formfill.random)

(defn hex-color
  "Generates a random color, represented as a hexadecimal string
  @todo: sometimes generates a <6 digit hex number."
  []
  (str "#" (.toString (.floor js/Math (* (.random js/Math) 16777215)) 16)))

(defn date
  "Generates a JS Date object representing a random date.
  @todo: make it random"
  []
  (js/Date.))

(defn date-string
  "Generates a random date string in the format YYYY-mm-dd"
  []
  (let [date (date)]
    (subs (.toISOString date) 0 10)))
