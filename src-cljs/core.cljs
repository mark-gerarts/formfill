(ns formfill.core
  (:require [libs.faker :as faker]))

(defn find-forms
  "Finds every form on the page."
  []
  (.querySelectorAll js/document "form"))

(defn fill-form
  "Tries to fill a given form."
  [form]
  ())

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
  ('nil))
