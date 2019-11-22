import './managerClass.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router';
import Loading from 'app/shared/Loader/loading';
import * as managerClassAction from 'app/modules/managerClass/managerClass.reducer';
import ReactPaginate from 'react-paginate';
import qs from 'querystring';
import { paramObj } from 'app/shared/util/util';
import { SCREEN_PATH } from 'app/config/constants';
import _ from 'lodash';

// import { getCategory } from "app/shared/reducers/category";

export interface IViewDataProp extends StateProps, DispatchProps {
  initScreen: Function;
  setPageNumber: Function;
  reset: Function;
  location: any;
}

export class ViewData extends React.Component<IViewDataProp> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.initScreen();
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<IViewDataProp>, prevState: Readonly<{}>): any | null {
    const currentParams = paramObj(this.props.location.search);
    const prevParams = paramObj(prevProps.location.search);
    if (currentParams['page'] !== prevParams['page']) {
      this.props.initScreen();
    }
    return null;
  }

  componentDidUpdate(prevProps: Readonly<IViewDataProp>, prevState: Readonly<{}>, snapshot?: any): void {
  }

  render() {
    const { managerClassData, pagination, loading } = this.props;
    return (
      <>
        <div className="col-12 action-wrapper">
          <button className="btn btn-action">Lớp học</button>
          <button className="btn btn-action ml-2">Import</button>
          <button className="btn btn-action ml-2">Export</button>
        </div>
        <div className="col-12 custom-table">
          <div className="row custom-table-header no-gutters">
            <div className="col-1">STT</div>
            <div className="col-1">Tên khối</div>
            <div className="col-1">Mã lớp</div>
            <div className="col-1">Tên lớp</div>
            <div className="col-1">Sĩ Số</div>
            <div className="col-3">Giáo viên chủ nhiệm</div>
            <div className="col-2">Lớp chuyên</div>
            <div className="col-2">Action</div>
          </div>
          {!loading ?
            <>
              {
                managerClassData && managerClassData.length === 0 ?
                  <div className="row no-gutters custom-table-data">
                    <div className="col-12">No record found</div>
                  </div> :
                  managerClassData && managerClassData.map((v, idx) => (
                    <div className="row no-gutters custom-table-data" key={idx}>
                      <div className="col-1">{idx + 1}</div>
                      <div className="col-1">{v.groupOfClass}</div>
                      <div className="col-1">{v.idClass}</div>
                      <div className="col-1">{v.nameClass}</div>
                      <div className="col-1">{v.totalStudent}</div>
                      <div className="col-3">{v.teacherManage}</div>
                      <div className="col-2">{v.professionalClass}</div>
                      <div className="col-2">Action</div>
                    </div>
                  ))
              }
            </> : <Loading/>
          }
        </div>
        {pagination &&
        !loading &&
        pagination.totalPage > 1 && (
          <div className="paging-container d-flex justify-content-center">
            <ReactPaginate
              breakLabel={<a>...</a>}
              breakClassName={'break-me'}
              pageCount={pagination.totalPage}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={this.props.setPageNumber}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'current'}
              nextLabel={'Next'}
              previousLabel={'Prev'}
              forcePage={pagination.page.page}
            />
            {/* End Pagination */}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ common, managerClass }: IRootState) => ({
  managerClassData: managerClass.managerClassData,
  loading: managerClass.loading,
  pagination: managerClass.pagination
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: async (isReset = false) => {
    isReset && await dispatch(managerClassAction.reset());
    const params = paramObj(ownProps.location.search);
    const page = params['page'] && _.isInteger(_.toInteger(params['page'])) && _.toInteger(params['page']) > 0 ? _.toInteger(params['page']) - 1 : 0;
    await dispatch(managerClassAction.setPageNumber(page));
    await dispatch(managerClassAction.requestManagerClassData());
  },
  setPageNumber: async e => {
    const params = paramObj(ownProps.location.search);
    params.page = e.selected + 1;
    ownProps.history.push(`${SCREEN_PATH.MANAGER_CLASS}?${qs.stringify(params)}`);
  },
  reset: () => {
    managerClassAction.reset();
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewData));
