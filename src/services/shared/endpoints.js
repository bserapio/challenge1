const apiEndPoints = {
    baseUrl:'http://127.0.0.1:8000/',
    userList:     'api/user',
    userDetail:  'api/user/:id',
    userClientList:  'api/user/:id/client',
    userClientDetail:'api/user/:id/client/:idMeta',
    clientList:'api/client',
    clientDetail:'api/client/:id',
    clientElevate: 'api/client/elevate',
    login : 'login',
};

export default apiEndPoints;


/**
 $link = $(($useStage ? '<h4>Stage</h4>' : '<h4>Live</h4>') +
 '<a href="'+url+msg+'&opcode='+form.opcode+'" target="_blank" class="elevated-link">' + 'Login to '+form.opcode+'</a><br><br>' +
 '<a href="'+betaUrl.replace('{opcode}', form.opcode)+msg+'&opcode='+form.opcode+'" target="_blank" class="elevated-link">Login to '+form.opcode+' (beta)</a>');
 $form.find('div').html($link);
 $('a.elevated-link').on('click', function() {
                $('#myModal').modal('toggle');
            });
 api.key = "3rhC7T9Wne7dmhbEpde9"
 api.salt = "$5$!.dee9bvcteJaEajhrOn313hkl!1RWQyH09a$=909(34cna6$"

 url.app = "https://app.base7booking.com"
 public function elevateAction() {
        $api = Zend_Registry::get('config')->api;
        $misc = $this->_helper->Misc;
        $request = $this->getRequest();
        if ( $request->isXmlHttpRequest() ) {
            $this->_helper->layout->disableLayout();
            $opcode = $request->getParam("opcode");

            // check that user has proper access rights for the a given opcode
            // e.g. sales can only backdoor demo accounts
            $model = new Application_Model_DbTable_ClientDb;
            $client = $model->getClientByOpcode($opcode);
            $clientType = in_array($client->type, array('client', 'demo')) ? $client->type : 'client';
            if (!$this->_acl->isAllowed($this->_user->role, $clientType, 'backdoor-enter')) {
                echo "You are not allowed to enter this account";
                exit();
            }

            $form = new Application_Form_Login($opcode);
            if ( $request->isPost() ) {
              if ($form->isValid($request->getPost())) {

                if ($this->process($form->getValues())) {
                    $opcode = $form->getValue("opcode");
                    $pub = $api->key;
                    $salt = $api->salt;
                    $key = crypt($pub.$opcode,$salt);
					$appUrl = Zend_Registry::get('config')->url->app;
                    // PUT THE URL IN INI
                    $apiKey = $misc->send("$appUrl/api/backdoor/get-key?key=".urlencode($key)."&opcode=".$opcode);
                    echo $apiKey;
                    $username = Zend_Auth::getInstance()->getIdentity()->username;
                    $users = $misc->getUsersEmail();
                    $to = (isset($users[$username])) ? $users[$username] : $users['admin'];

exit();
}
else {
    echo "Username/password not valid";
    exit();
}
}
else {
    echo "Username/password not valid";
    exit();
}
}
$this->view->form = $form;
$this->view->login = true;
}
}