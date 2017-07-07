SERVER SIDE
===============

Conventions:

* Routes folder: Routes will have only the routes and point to controller functions
* Controllers: Controllers have function Logic
* Db : Have all about db: Models


routes

* /login : Log user

* /api/user : User EndPoints

    * /:id/client/:idMeta (GET/PUT) :client "IdMeta" from client :id
    * /:id/client (GET): List all Client from users ( paginated)
    * /:id (GET/PUT): List a clientID
    * / (GET/POST) List all users or create one
    
* /api/client :Client EndPoints
    * / (GET/POST) : List all clientsdb (Paginated) or create a Client DB
    * /:id(GET/PUT) : Show one client id or updated



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

* Create Client Account
```
 $expireDate = mktime(0, 0, 0, date("m"), date("d")+30, date("Y"));
          $misc = $this->_helper->Misc;
          $dbName = 'client_'.$input['opcode'];
          $dbUser = 'b7_'.$input['opcode'];
          $password = $misc->randomPassword();

          $data = array(
            'identifier' => $input['opcode'],
            'client_id' => null,
            'name' => $input['name'],
            'lang' => $input['lang'],
            'db_name' => $dbName,
            'db_login' => $dbUser,
            'db_pass' => $password,
            'active' => 1,
            'maintenance' => 0,
            'auto_update' => 1,
            'expire_date' => date('Y-m-d', $expireDate),
          );

```





CLIENT SIDE
===========

Conventions

* Routes: Will have all about routes




* Containers : Will have components



