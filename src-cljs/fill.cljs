(ns formfill.fill
  (:require [libs.faker :as faker]
            formfill.random))


(defn should-fill-element?
  "Checks if a given input element should be filled. For
  example, we don't want to fill a hidden input."
  [input-el]
  (let [excluded-types ["hidden" "submit" "button" "image" "reset"]]
    (not (or
          (aget input-el "disabled")
          (some #{(aget input-el "type")} excluded-types)))))

(defn guess-from-type
  "Guesses the fill method based on the type of an element"
  [type]
  (case type
    "email" faker.internet.email
    "textarea" faker.lorem.sentence
    "color" formfill.random.hex-color
    "date" formfill.random.date-string
    nil))

(defn guess-from-label
  "Guesses the fill method based on the label of an element"
  [label]
  ;; @todo
  false)

(defn guess-fill-method
  "Guesses the most appropriate method to fill a form element.
  E.g. an input field with type 'email' should be filled with
  the faker.internet.email function"
  [input-el]
  (or
   (guess-from-type (aget input-el "type"))
   (guess-from-label nil)
   ;; If we can't find an appropriate method, we'll just use
   ;; a random word.
   faker.random.word))

(defn fill-element
  "Fills a single input element"
  [input-el]
  (when (should-fill-element? input-el)
    (case (aget input-el "type")
      ;; @todo: These inputs should chose a random
      ;; option.
      ("select-one"
       "select-multiple"
       "radio"
       "checkbox"
       "range") nil
       (aset input-el "value" ((guess-fill-method input-el))))))

(defn fill-form
  "Tries to fill a given form."
  [form]
  (doseq [input-el (aget form "elements")] (fill-element input-el)))
