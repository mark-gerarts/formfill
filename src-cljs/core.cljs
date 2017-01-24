(ns formfill.core
  (:use [formfill.fill :only (fill-form)]))

;; Makes a Nodelist traversable.
(extend-type js/NodeList
  ISeqable
  (-seq [array] (array-seq array 0)))

;; Makes an HTMLFormControlsColelction traversable.
(extend-type js/HTMLFormControlsCollection
  ISeqable
  (-seq [array] (array-seq array 0)))

(defn find-forms
  "Finds every form on the page."
  []
  (.querySelectorAll js/document "form"))

((defn fill
  "Main function - fills every form"
  []
  (doseq [form (find-forms)] (fill-form form))))

