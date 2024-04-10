def compare_objects_as_dicts(ob_1, ob_2, ignored_keys=[]):
    """
    This method can be used to compare between two objects in tests while ignoring keys that are generated as side effects like uuids or autogenerated date time fields.
    """

    default_ignored_keys = ["_sa_instance_state"]
    final_ignored_keys = set(ignored_keys + default_ignored_keys)

    for key in final_ignored_keys:
        if key in ob_1.__dict__:
            del ob_1.__dict__[key]
        if key in ob_2.__dict__:
            del ob_2.__dict__[key]

    print(ob_1.__dict__, "==", ob_2.__dict__)
    return ob_1.__dict__ == ob_2.__dict__