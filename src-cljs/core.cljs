(ns formfill.core
  (:require [libs.faker :as faker]))

(defn find-forms
  "Finds every form on the page."
  []
  (.querySelectorAll js/document "form"))

(defn fill-form
  "Tries to fill a given form."
  [form]
  (for [input-el (-.elements form)] (fill-element input-el)))

(defn fill-element
  "Fills a single input element"
  [input-el]
  (when (should-fill-element? input-el)
    (aset input-el "value" (guess-fill-method input-el))))

(defn should-fill-element?
  "Checks if a given input element should be filled. For
  example, we don't want to fill a hidden input."
  [input-el]
  (let [excluded-types ["hidden" "submit" "button" "image" "reset"]]
    (not (or
          (.-disabled input-el)
          (contains? excluded-types (.-type input-el))))))

(defn guess-fill-method
  "Guesses the most appropriate method to fill a form element.
  E.g. an input field with type 'email' should be filled with
  the faker.internet.email function"
  [input-el]
  (or
   (guess-from-type (-.type input-el))
   (guess-from-label nil)))

(defn guess-from-type
  "Guesses the fill method based on the type of an element"
  [type]
  (case type
    "email" faker.internet.email
    "textarea" faker.lorem.sentence))

(defn guess-from-label
  "Guesses the fill method based on the label of an element"
  [label]
  false)


(defn fill
  "Main function - fills every form"
  []
  (.log js/console "Filling forms")
  (for [form (find-forms)] (fill-form form)))

(fill)
