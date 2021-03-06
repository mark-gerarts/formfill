(defproject formfill-cljs "0.1.0"
  :plugins [[lein-cljsbuild "1.1.5"]]

  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.9.229"]]
  :cljsbuild {
    :builds [{
        :source-paths ["src-cljs"]
        :compiler {
          :output-to "formfill/formfill.js"
          :foreign-libs [{:file "lib/faker.min.js"
                          :provides ["libs.faker"]}]
          :optimizations :simple
          :pretty-print true}}]})
