SERVER SIDE
===============

Conventions:

* Routes folder: Routes will have only the routes and point to controller functions
* Controllers: Controllers have function Logic
* Db : Have all about db: Models



Salt Password
```
public function create($password)
    {
        if (empty($this->salt)) {
            $salt = Jr_Math_Rand::getBytes(self::MIN_SALT_SIZE);
        } else {
            $salt = $this->salt;
        }
        $salt64 = substr(str_replace('+', '.', base64_encode($salt)), 0, 22);
        /**
         * Check for security flaw in the bcrypt implementation used by crypt()
         * @see http://php.net/security/crypt_blowfish.php
         */
        if (version_compare(PHP_VERSION, '5.3.7') >= 0) {
            $prefix = '$2y$';
        } else {
            $prefix = '$2a$';
            // check if the password contains 8-bit character
            if (preg_match('/[\x80-\xFF]/', $password)) {
                throw new Jr_Crypt_Exception(
                    'The bcrypt implementation used by PHP can contains a security flaw ' .
                    'using password with 8-bit character. ' .
                    'We suggest to upgrade to PHP 5.3.7+ or use passwords with only 7-bit characters'
                );
            }
        }
        $hash = crypt($password, $prefix . $this->cost . '$' . $salt64);
        if (strlen($hash) <= 13) {
            throw new Jr_Crypt_Exception('Error during the bcrypt generation');
        }
        return $hash;
    }

```




CLIENT SIDE
===========

Conventions

* Routes: Will have all about routes
* Containers : Will have components



