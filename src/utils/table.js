export function id_desc_sort(a, b){
  if (a.h_create_id > b.h_create_id) {
    return -1
  } else if (a.h_create_id < b.h_create_id) {
    return 1
  } else {
    return 0
  }
}
export function id_asc_sort(a, b) {
  if (a.h_create_id < b.h_create_id) {
    return -1
  } else if (a.h_create_id > b.h_create_id) {
    return 1
  } else {
    return 0
  }
}
export function date_asc_sort(a, b) {
  if (a.createdate < b.createdate) {
    return -1
  } else if (a.createdate > b.createdate) {
    return 1
  } else {
    return 0
  }
}
export function isc_desc_sort(a, b) {
  if (a.iscertification > b.iscertification) {
    return -1
} else if (a.iscertification < b.iscertification) {
    return 1
  } else {
    return 0
  }
}
export function isc_asc_sort(a, b) {
  if (a.iscertification < b.iscertification) {
    return -1
  } else if (a.iscertification > b.iscertification) {
    return 1
  } else {
    return 0
  }
}
export function date_desc_sort(a, b) {
  if (a.createdate > b.createdate) {
    return -1
} else if (a.createdate < b.createdate) {
    return 1
  } else {
    return 0
  }
}
export function gender_asc_sort(a, b) {
  return a.gender.localeCompare(b.gender, "zh");
}
export function gender_desc_sort(a, b) {
  return b.gender.localeCompare(a.gender, "zh");
}
export function nickname_asc_sort (param1, param2) {
  return param1.nickname.localeCompare(param2.nickname, "zh");
}
export function nickname_desc_sort (param1, param2) {
  return param2.nickname.localeCompare(param1.nickname, "zh");
}
export function realname_asc_sort (param1, param2) {
  return param1.realname.localeCompare(param2.realname, "zh");
}
export function realname_desc_sort (param1, param2) {
  return param2.realname.localeCompare(param1.realname, "zh");
}
