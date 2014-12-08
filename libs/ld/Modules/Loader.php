<?php

    namespace ld\Modules;

    error_reporting(E_ALL ^ E_WARNING);
        
    class Loader {
        private $loaded_modules = array();
        private $default_namespace = '';

        public function defaultNamespace($namespace) {
            $this->default_namespace = $namespace;
        }

        /**
         * Adds an available module that can be loaded via ->module($name)
         * $module may either be a module name (string) which is then prefixed with
         * $this->default_namespace, or an array($module_name, $class_name)
         */
        public function addModule($module) {
            if (is_string($module)) {
                $this->loaded_modules[$module] = $this->default_namespace . '\\' . $module;
            } elseif (is_array($module)) {
                $this->loaded_modules[$module[0]] = $module[1];
            }
        }

        public function moduleAvailable($module_name) {
            return isset($this->loaded_modules[$module_name]);
        }

        /**
         * Load and create an instance of a module
         */
        public function module($module_name) {
            if (!$this->moduleAvailable($module_name)) {
                return false;
            }

            $module = new $this->loaded_modules[$module_name];

            return $module;
        }
    }