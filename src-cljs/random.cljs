(ns formfill.random)

(defn hex-color
  "Generates a random color, represented as a hexadecimal string"
  []
  (str "#" (.toString (rand-int 16rFFFFFF) 16)))
