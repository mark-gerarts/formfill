(ns formfill.core
  (:use [formfill.fill :only (fill-form)]))

;; Make some JS specific list types traversable.

(let [types-to-extend [js/NodeList
                       js/HTMLFormControlsCollection
                       js/HTMLOptionsCollection]]
  (doseq [type types-to-extend]
    ((fn [type]
       (extend-type type
         ISeqable
         (-seq [array] (array-seq array 0)))) type)))

(defn find-forms
  "Finds every form on the page."
  []
  (.querySelectorAll js/document "form"))

((defn fill
  "Main function - fills every form"
  []
  (doseq [form (find-forms)] (fill-form form))))

