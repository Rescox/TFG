<?php
// This file is part of Moodle Course Rollover Plugin
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.




require_once("$CFG->libdir/formslib.php");
ini_set("allow_url_fopen", 1);

class edit extends moodleform {
    //Add elements to form
    public function definition() {
        global $CFG,$USER,$COURSE, $DB;

        $sql = "SELECT
                    u.id AS userid,
                    c.id AS courseid,
                    u.firstname,
                    u.lastname,
                    u.email
                                            
                FROM
                    mdl_role_assignments ra
                    JOIN mdl_user u ON u.id = ra.userid
                    JOIN mdl_role r ON r.id = ra.roleid
                    JOIN mdl_context cxt ON cxt.id = ra.contextid
                    JOIN mdl_course c ON c.id = cxt.instanceid

                WHERE 
                    ra.userid = u.id
                                            
                AND 
                    ra.contextid = cxt.id
                AND 
                    cxt.contextlevel =50
                AND 
                    cxt.instanceid = c.id
                AND  
                    roleid = 5
                AND
                    c.id = :courseid

                ORDER BY 
                    c.fullname";

        if($_GET['course'] == "") { 
            $params = [
                'courseid' => $mform->courseId,
            ];
        } else {
            $params = [
                'courseid' => $_GET['course'],
            ];
        }

        $json = file_get_contents('http://localhost:4000/template');
        $obj = json_decode($json);
        foreach($obj as $val) {
            if($val->creator == $USER->email)
                var_dump(1);
        }

        $mform = $this->_form; 

        //Hidden course
        $mform->addElement('hidden', 'courseId', ''); // Add elements to your form
        $mform->setDefault('courseId', $_GET['course']);        //Default value
        
        //Campaign Name
        $mform->addElement('text', 'campaignName', 'Campaign Name'); // Add elements to your form
        $mform->setDefault('campaignName', 'Please enter a campaign name');        //Default value

        //Launch Date
        $mform->addElement('date_selector', 'launchDate', 'Launch Date'); // Add elements to your form
        $mform->setDefault('launchDate', 'Please enter a launch date');        

        //End Date
        $mform->addElement('date_selector', 'endDate', 'End Date'); 
        $mform->setDefault('endDate', 'Please enter a launch date');        
    

        $choices = array();
        $choices['{"id":1,"name":"Twitter-Por Defecto"}'] = "Twitter por defecto";
        $choices['{"id":3,"name":"Spotify-Por Defecto"}'] = "Spotify por defecto";
        $choices['{"id":4,"name":"Google-Por Defecto"}'] = "Google por defecto";
        $select2 = $mform->addElement('select', 'messagetype', 'Message type', $choices);
        $mform->setDefault('messagetype', '3');
        $select2->setMultiple(true);

        
        $users = $DB->get_records_sql($sql, $params);
        foreach($users as $singleUser) {
            var_dump($singleUser->userid);
            $emails[$singleUser->userid] = $singleUser->email;
        }

        $select3 = $mform->addElement('select', 'users', 'Users', $emails);
        $mform->setDefault('users', '5');
        $select3->setMultiple(true);

        $this->add_action_buttons();


    }

    function validation($data, $files) {
        var_dump($data);
    }
}