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
 */



require_once(__DIR__. '/../../config.php');
require_once($CFG->dirroot . '/local/message/classes/form/edit.php');

global $DB;

$PAGE->set_url(new moodle_url('/local/message/edit.php'));
$PAGE->set_context(\context_system::instance());
$PAGE->set_title('Edit');


//Aqui moostramos el formulario
$mform = new edit();

if ($mform->is_cancelled()) {
    redirect($CFG->wwwroot . '/local/message/manage.php', 'You cancelled the message form');
} else if ($fromform = $mform->get_data()) {

    $recordtoinsert = new stdClass();
    var_dump($fromform);
    $recordtoinsert->messagetext = $fromform->messageText;
    $recordtoinsert->messagetype = $fromform->messagetype;
    $recordtoinsert->messagetext = $fromform->launchDate;
    $recordtoinsert->messagetype = $fromform->endDate;
    $DB->insert_record('local_message', $recordtoinsert);
    redirect($CFG->wwwroot . '/local/message/manage.php', 'You created a message');
    
  
}

echo $OUTPUT->header();

$mform->display();

echo $OUTPUT->footer();
