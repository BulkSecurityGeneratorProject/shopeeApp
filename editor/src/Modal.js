var saveAppModal = function() {
  return (
    `<div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Save App</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row form-group">
            <div class="col-3">App Name</div>
            <div class="col-9">
                <input class="form-control" id="appName"/>
            </div>
          </div>
          <div class="row">
          <div class="col-9 offset-3">
                <div class="text-danger" id="responseError"></div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" disabled id="saveApp">Save changes</button>
        </div>
      </div>
    </div>`
  );
};

var loadAppModal = function() {
  return (
    `<div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Load App</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row form-group">
            <div class="col-3">App Name</div>
            <div class="col-9">
                <input class="form-control" id="appName"/>
            </div>
          </div>
          <div class="row">
          <div class="col-9 offset-3">
                <div class="text-danger" id="responseError"></div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" disabled id="saveApp">Load</button>
        </div>
      </div>
    </div>`
  );
};


var publishAppModal = function() {
  return (
    `<div class="modal-dialog publish-dialog" role="document">
      <div class="modal-content">
          <div class="save-publish-panel-header">
          <button class="close" data-dismiss="modal">
          <svg width="25" height="25" viewBox="0 0 25 25" class="symbol symbol-headerCloseButton"><path d="M11.793 12.5L8.146 8.854 7.793 8.5l.707-.707.354.353 3.646 3.647 3.646-3.647.354-.353.707.707-.353.354-3.647 3.646 3.647 3.646.353.354-.707.707-.354-.353-3.646-3.647-3.646 3.647-.354.353-.707-.707.353-.354 3.647-3.646z"></path></svg>
          </button>
            <div class="title">Your changes were saved</div>
            <div class="subtitle">Publish to see your changes live at the following domain:</div>
          </div>
        <div class="modal-body">
          <div class="row no-gutters form-group">
            <div class="col-9">
                <input class="form-control" readonly id="appName"/>
            </div>
            <div class="col-3">
                <a target="_blank" href="#" class="app-link" id="app-link">View Site</a>
            </div>
          </div>
          <div class="row">
          <div class="col-9 offset-3">
                <div class="text-danger" id="responseError"></div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id="publishApp">Publish</button>
        </div>
      </div>
    </div>`
  );
};
