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

/**
 * @package     local_message
 * @author      Kristian
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @var stdClass $plugin
 */


require_once("$CFG->libdir/formslib.php");
 
class edit extends moodleform {
    //Add elements to form
    public function definition() {
        global $CFG;
 
        $mform = $this->_form; 
        
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
        $choices['0'] = \core\output\notification::NOTIFY_WARNING;
        $choices['1'] = \core\output\notification::NOTIFY_SUCCESS;
        $choices['2'] = \core\output\notification::NOTIFY_ERROR;
        $choices['3'] = \core\output\notification::NOTIFY_INFO;
        $mform->addElement('select', 'messagetype', 'Message type', $choices);
        $mform->setDefault('messagetype', '3');

        $this->add_action_buttons();


    }

    function validation($data, $files) {
        return array();
    }
}