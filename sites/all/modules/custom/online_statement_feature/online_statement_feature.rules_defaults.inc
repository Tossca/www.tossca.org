<?php
/**
 * @file
 * online_statement_feature.rules_defaults.inc
 */

/**
 * Implements hook_default_rules_configuration().
 */
function online_statement_feature_default_rules_configuration() {
  $items = array();
  $items['rules_new_online_statement'] = entity_import('rules_config', '{ "rules_new_online_statement" : {
      "LABEL" : "New Online Statement",
      "PLUGIN" : "reaction rule",
      "OWNER" : "rules",
      "REQUIRES" : [ "rules" ],
      "ON" : { "node_insert--online_statement" : { "bundle" : "online_statement" } },
      "DO" : [
        { "mail" : {
            "to" : [ "node:field-online-statement-mail" ],
            "subject" : "Ihre Erkl\\u00e4rung an TOSSCA",
            "message" : "Vielen Dank f\\u00fcr Ihre Erkl\\u00e4rung als [node:field-online-statement-type] [node:field-online-statement-name],\\r\\n\\r\\nlorem ipsum\\r\\n\\r\\nBeste Gr\\u00fc\\u00dfe\\r\\nDas TOSSCA-Team",
            "from" : "info@tossca.org",
            "language" : [ "site:current-page:language" ]
          }
        }
      ]
    }
  }');
  return $items;
}
